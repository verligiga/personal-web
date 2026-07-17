-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "noteId" TEXT;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "bulletsId" JSONB;

-- AlterTable
ALTER TABLE "OrganizationRole" ADD COLUMN     "bulletsId" JSONB;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "summaryId" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "descriptionId" TEXT,
ADD COLUMN     "summaryId" TEXT;
