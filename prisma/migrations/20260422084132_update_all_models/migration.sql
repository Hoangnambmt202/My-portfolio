/*
  Warnings:

  - You are about to drop the column `category` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ExpType" ADD VALUE 'INTERNSHIP';
ALTER TYPE "ExpType" ADD VALUE 'CONTRACT';

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "achievements" TEXT[],
ADD COLUMN     "coursework" TEXT[],
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "decision" TEXT,
ADD COLUMN     "metrics" JSONB,
ADD COLUMN     "problem" TEXT,
ADD COLUMN     "result" TEXT;

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "category",
DROP COLUMN "icon",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "groupId" TEXT,
ADD COLUMN     "iconPublicId" TEXT,
ADD COLUMN     "iconUrl" TEXT,
ADD COLUMN     "isHighlighted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "proficiency" INTEGER NOT NULL DEFAULT 75,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "whenToUse" TEXT,
ADD COLUMN     "whyItMatters" TEXT,
ALTER COLUMN "level" SET DEFAULT 'Intermediate',
ALTER COLUMN "level" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "SkillGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL DEFAULT '#3b82f6',
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkillGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SkillGroup_slug_key" ON "SkillGroup"("slug");

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "SkillGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
