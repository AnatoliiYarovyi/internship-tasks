import { BetterSQLite3Database } from 'drizzle-orm-sqlite/better-sqlite3';
import { like } from 'drizzle-orm/expressions';

import connecting from '../../db/connecting';
import { clinics } from '../tables/clinicsTable';

export class Clinics {
  private db: BetterSQLite3Database = connecting();

  async getClinicsByName(value: string) {
    const results = this.db
      .select(clinics)
      .fields({
        city: clinics.city,
        state: clinics.state,
        clinicName: clinics.clinicName,
        fullAddress: clinics.fullAddress,
        postcode: clinics.postcode,
        website: clinics.website,
        phone: clinics.phone,
        suburb: clinics.suburb,
        email: clinics.email,
        aboutClinic: clinics.aboutClinic,
      })
      .where(like(clinics.clinicName, `%${value}%`))
      .all();

    return results;
  }

  async getClinicsByCity(value: string) {
    const results = this.db
      .select(clinics)
      .fields({
        city: clinics.city,
        state: clinics.state,
        clinicName: clinics.clinicName,
        fullAddress: clinics.fullAddress,
        postcode: clinics.postcode,
        website: clinics.website,
        phone: clinics.phone,
        suburb: clinics.suburb,
        email: clinics.email,
        aboutClinic: clinics.aboutClinic,
      })
      .where(like(clinics.city, `%${value}%`))
      .all();

    return results;
  }

  async getClinicsByState(value: string) {
    const results = this.db
      .select(clinics)
      .fields({
        city: clinics.city,
        state: clinics.state,
        clinicName: clinics.clinicName,
        fullAddress: clinics.fullAddress,
        postcode: clinics.postcode,
        website: clinics.website,
        phone: clinics.phone,
        suburb: clinics.suburb,
        email: clinics.email,
        aboutClinic: clinics.aboutClinic,
      })
      .where(like(clinics.state, `%${value}%`))
      .all();

    return results;
  }

  async getClinicsByPostcode(value: string) {
    const results = this.db
      .select(clinics)
      .fields({
        city: clinics.city,
        state: clinics.state,
        clinicName: clinics.clinicName,
        fullAddress: clinics.fullAddress,
        postcode: clinics.postcode,
        website: clinics.website,
        phone: clinics.phone,
        suburb: clinics.suburb,
        email: clinics.email,
        aboutClinic: clinics.aboutClinic,
      })
      .where(like(clinics.postcode, `%${value}%`))
      .all();

    return results;
  }

  async getClinicsBySuburb(value: string) {
    const results = this.db
      .select(clinics)
      .fields({
        city: clinics.city,
        state: clinics.state,
        clinicName: clinics.clinicName,
        fullAddress: clinics.fullAddress,
        postcode: clinics.postcode,
        website: clinics.website,
        phone: clinics.phone,
        suburb: clinics.suburb,
        email: clinics.email,
        aboutClinic: clinics.aboutClinic,
      })
      .where(like(clinics.suburb, `%${value}%`))
      .all();

    return results;
  }

  async getClinicNames(value: string) {
    const results = this.db
      .select(clinics)
      .fields({
        suggestion: clinics.clinicName,
      })
      .where(like(clinics.clinicName, `${value}%`))
      .groupBy(clinics.clinicName)
      .all();

    return results;
  }
}
