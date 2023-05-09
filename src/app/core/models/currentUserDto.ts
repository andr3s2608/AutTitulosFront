export interface CurrentUserDto {
  accessToken?: string;
  userId: string;
  codeVentanilla: number;
  rol: string;
  fullName: string;
  email: string;
  documentType: string;
  documentNumber: string;
}
