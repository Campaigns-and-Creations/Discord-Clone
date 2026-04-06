DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'Channel'
      AND column_name = 'updatedAt'
  ) THEN
    ALTER TABLE "Channel" ALTER COLUMN "updatedAt" DROP DEFAULT;
  END IF;
END $$;
