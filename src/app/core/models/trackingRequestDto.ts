/**
 * Dto de guardado de tracking
 */
export interface TrackingRequestDto {
  IdStatusTypes: number;

  IdProcedureRequest: number;

  IdUser: string;

  dateTracking: Date;

  observations?: string;

  negation_causes?: string;
  other_negation_causes?: string;
  recurrent_argument?: string;
  consideration?: string;
  exposed_merits?: string;
  articles?: string;
  additional_information?: string;
  clarification_types_motives?: string;
  paragraph_MA?: string;
  paragraph_JMA1 ?: string;
  paragraph_JMA2 ?: string;
  paragraph_AMA?: string;
}
