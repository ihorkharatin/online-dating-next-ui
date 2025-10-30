// types/user.ts

export default interface User {
  _id: string;
  cognitoSub: string; // Унікальний Cognito ідентифікатор користувача
  nickname: string; // Нікнейм користувача
  password: string; // Хешований пароль (не відправляється на фронт)
}
