import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  id: PrismaUser['id'];
  email: PrismaUser['email'];
  name: PrismaUser['name'];
  password: PrismaUser['password'];
  createdAt: PrismaUser['createdAt'];
}
