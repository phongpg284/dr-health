export class GetMedicalStatQuery {
  filterStats?: string[];
  lowThreshold?: number | string;
  highThreshold?: number | string;
  startDate?: Date;
  endDate?: Date;
}

export class GetMedicalStatDto {
  id!: number;
  query: GetMedicalStatQuery;
}
