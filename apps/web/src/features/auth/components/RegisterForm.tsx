import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {schemas} from '@repo/zod/schemas'
import {useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getAxios } from '@/services/axios'
import { API_ENDPOINTS } from '@/config/api'

const RegisterForm = () => {

const {register , handleSubmit, formState:{errors}} = useForm({
    resolver: zodResolver(schemas.register)
});

    const onSubmit = async(data) => {
      const response =   await getAxios().post(API_ENDPOINTS.REGISTER,data)
      console.log(response,'response')
        
  
    }

  return (
      <Card className='text-left flex' >
                <CardHeader >
                    <CardTitle className='text-xl'>Create an account</CardTitle>
                    {/* <CardDescription>Enter your email and password</CardDescription> */}
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5' >
                          <div>
                            <label htmlFor="text">Name</label>
                            <Input {...register('name')} placeholder='John Doe' type="text" />
                            <p className='text-red-400' >{errors.name?.message}</p>
                        </div>

                        <div>
                            <label htmlFor="text">Email</label>
                            <Input {...register('email')} placeholder='name@example.com' type="text" />
                             <p className='text-red-400' >{errors.email?.message}</p>
                        </div>

                        <div>
                            <label htmlFor="text">Password</label>
                            <Input {...register('password')} type="password" />
                            <p className='text-red-400' >{errors.password?.message}</p>
                            {/* <div className='flex gap-3 items-center mt-3'>
                                <Checkbox id='Remember' />
                                <label htmlFor="Remember">Remember me</label>
                            </div> */}
                        </div>

                        {/* checkbox */}



                        <Button type='submit' className='w-full mt-4' >Sign up</Button>

                                            <div className=" mb-4 after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                            Or continue with
                        </span>
                    </div>

                    <Button variant="secondary" className="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                            />
                        </svg>
                        Login with Google
                    </Button>
                    </form>
                </CardContent>
            </Card>
  )
}

export default RegisterForm