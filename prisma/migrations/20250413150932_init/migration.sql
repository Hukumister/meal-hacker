-- CreateTable
CREATE TABLE "recipes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "cooking_time" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "proteins" INTEGER NOT NULL,
    "fats" INTEGER NOT NULL,
    "carbohydrates" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
