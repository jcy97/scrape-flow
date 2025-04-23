"use server";

import { symmetricEncrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import {
  createCredentialSchema,
  createCredentialSchemaType,
} from "@/schema/credential";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { off } from "process";

export async function CreateCredentials(form: createCredentialSchemaType) {
  const { success, data } = createCredentialSchema.safeParse(form);

  if (!success) {
    throw new Error("invalid form data");
  }

  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthenicated");
  }

  const encryptedValue = symmetricEncrypt(data.value);
  console.log("@TEST", {
    plain: data.value,
    encrypted: encryptedValue,
  });
  const result = await prisma.credential.create({
    data: {
      userId,
      name: data.name,
      value: encryptedValue,
    },
  });

  if (!result) {
    throw new Error("failed to create credential");
  }

  revalidatePath("/credentials");
}
