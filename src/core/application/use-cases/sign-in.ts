export type ISignInUseCase = ReturnType<typeof signInUseCase>;

export const signInUseCase = async (
  {
    // username,
    // password,
  }: {
    username: string;
    password: string;
  }
) => {
  // const existingUser = await usersRepository.getUserByUsername(username);
  // if (!existingUser) {
  //   throw new AuthenticationError("User does not exist");
  // }
  // const validPassword = await authenticationService.validatePasswords(
  //   password,
  //   existingUser.password_hash
  // );
  // if (!validPassword) {
  //   throw new AuthenticationError("Incorrect username or password");
  // }
  // return await authenticationService.createSession(existingUser);
};
