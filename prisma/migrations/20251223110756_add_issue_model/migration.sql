/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Issue` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "IssueType" AS ENUM ('CLOUD_SECURITY', 'REDTEAM_ASSESSMENT', 'VAPT');

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "updatedAt",
DROP COLUMN "type",
ADD COLUMN     "type" "IssueType" NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Open';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt";

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
