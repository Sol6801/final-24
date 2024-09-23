import { getAuth } from "firebase-admin/auth"
import { app } from "../../../firebase/server"

export const POST = async ({ request, redirect }) => {
  const auth = getAuth(app)

  /* Get form data */
  const formData = await request.formData()

  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()
  const name = formData.get("name")?.toString()

  if (!email || !password || !name) {
    return new Response(
      "Falta uno o más campos",
      { status: 400 }
    )
  }

  /* Create user */
  try {
    await auth.createUser({
      email,
      password,
      displayName: name,
    })
  } catch (error) {
    console.log(error)
    return new Response(
      "Something went wrong",
      { status: 400 }
    )
  }
  return redirect("/user-created")
}