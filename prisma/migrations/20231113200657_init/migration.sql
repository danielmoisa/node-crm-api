-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NONBINARY', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "NotificationEmail" AS ENUM ('ACCOUNT', 'UPDATES', 'PROMOTIONS');

-- CreateEnum
CREATE TYPE "PrefersColorScheme" AS ENUM ('NO_PREFERENCE', 'LIGHT', 'DARK');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUDO', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" INTEGER NOT NULL,
    "countryCode" TEXT NOT NULL DEFAULT 'us',
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "prefersLanguage" TEXT NOT NULL DEFAULT 'en-us',
    "profilePictureUrl" TEXT NOT NULL DEFAULT 'https://unavatar.now.sh/fallback.png',
    "timezone" TEXT NOT NULL DEFAULT 'America/Los_Angeles',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "prefersColorScheme" "PrefersColorScheme" NOT NULL DEFAULT 'NO_PREFERENCE',
    "notificationEmail" "NotificationEmail" NOT NULL DEFAULT 'ACCOUNT',
    "gender" "Gender" NOT NULL DEFAULT 'UNKNOWN',
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
