import { LocalProfileRepository } from '../repositories/local';
import { LocalMeasurementRepository } from '../repositories/local';
import { ProfileService } from './ProfileService';
import { MeasurementService } from './MeasurementService';

// Swap these implementations for API-backed repositories when adding a backend
const profileRepo = new LocalProfileRepository();
const measurementRepo = new LocalMeasurementRepository();

export const profileService = new ProfileService(profileRepo);
export const measurementService = new MeasurementService(measurementRepo);
