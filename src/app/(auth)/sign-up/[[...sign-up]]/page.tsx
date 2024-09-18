import { SignUp } from '@clerk/nextjs'
import AuthLayout from '../../layout'

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'w-full',
          },
        }}
        path="/sign-up"
      />
    </AuthLayout>
  )
}