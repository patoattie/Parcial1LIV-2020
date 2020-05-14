import { User } from './user';

export class Usuario extends User
{
  constructor(
    user?: User,
    uid?: string,
    email?: string,
    displayName?: string,
    photoURL?: string,
    emailVerified?: boolean)
  {
    if (user == null)
    {
      super(uid, email, displayName, photoURL, emailVerified);
    }
    else
    {
      super(user.uid, user.email, user.displayName, user.photoURL, user.emailVerified);
    }
  }
}
