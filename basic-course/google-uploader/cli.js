import 'dotenv/config';
import axios from 'axios';
import inquirer from 'inquirer';

const { TOKEN_TINYURL } = process.env;

let imagePathLocal = '';
let imageName = '';

const cli = fileUpload => {
  console.log('Hi, welcome to "CLI: Google Uploader"');
  const questions = [
    {
      type: 'input',
      name: 'image',
      message:
        'Drag and drop your image to terminal and press ENTER for upload:',
      default: '',
    },
  ];

  inquirer.prompt(questions).then(answers => {
    if (!answers.image) {
      console.log("Sorry but you didn't drag your image. Try again!)");
      cli();
    } else if (answers.image) {
      imagePathLocal = answers.image;
      const arrText = answers.image.split('/');
      imageName = arrText[arrText.length - 1];

      changeAndUpload(fileUpload);
    }
  });
};

const changeAndUpload = fileUpload => {
  const questions = [
    {
      type: 'confirm',
      name: 'changeImageName',
      message: `Your're uploading the file with the name: "${imageName}"\nWould you like to chenge it?`,
      default: false,
    },
    {
      type: 'input',
      name: 'newImageName',
      message:
        'Enter new image name (NOTE without extension .jpg, .png, etc.):',
      when(answers) {
        return answers.changeImageName === true;
      },
    },
  ];
  inquirer.prompt(questions).then(answers => {
    const imageArr = imageName.split('.');
    const imageType = imageArr[1];
    if (answers.newImageName) {
      imageName = `${answers.newImageName.trim()}.${imageType}`;
      console.log(`Super your image name changed to "${imageName}"`);
    }

    fileUpload(imageType, imageName, imagePathLocal);
  });
};

const getShortPath = fileId => {
  const questions = [
    {
      type: 'confirm',
      name: 'shortenLink',
      message: `Would you like to shorten you link?`,
      default: false,
    },
  ];
  inquirer.prompt(questions).then(async answers => {
    if (answers.shortenLink) {
      await axios({
        method: 'post',
        url: 'https://api.tinyurl.com/create',
        data: {
          url: `https://drive.google.com/file/d/${fileId}/view`,
          domain: 'tiny.one',
        },
        headers: {
          Authorization: `Bearer ${TOKEN_TINYURL}`,
        },
      })
        .then(res => {
          console.log(
            `Please your short image link:\n${res.data.data.tiny_url}\nBye-Bye!)`,
          );
        })
        .catch(err => console.log(err));
    } else {
      console.log(
        `Please your image link:\nhttps://drive.google.com/file/d/${fileId}/view\nBye-Bye!)`,
      );
    }
    process.exit();
  });
};

export { cli, getShortPath };
