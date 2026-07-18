-- AlterTable
ALTER TABLE "Project" ADD COLUMN "experienceId" TEXT;

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "subProjects";

-- CreateIndex
CREATE INDEX "Project_experienceId_idx" ON "Project"("experienceId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE SET NULL ON UPDATE CASCADE;
