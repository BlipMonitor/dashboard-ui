import { SignIn } from '@clerk/nextjs'
import AuthLayout from '../../layout'

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignIn
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'w-full',
          },
        }}
        path="/sign-in"
      />
    </AuthLayout>
  )
}