/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `articles_tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "articles_tags_name_key" ON "articles_tags"("name");
