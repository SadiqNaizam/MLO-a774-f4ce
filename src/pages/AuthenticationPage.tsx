import React, { useState } from 'react';
import { useSearchParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useForm } from "@/components/ui/form"; // Assuming form is from shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const signupSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});


const AuthenticationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'login'; // Default to login

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = mode === 'login' ? loginSchema : signupSchema;
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: mode === 'login' ? { email: "", password: "" } : { username: "", email: "", password: "", confirmPassword: "" },
  });


  const onSubmit = async (values: FormValues) => {
    console.log(`AuthenticationPage: ${mode} submitted`, values);
    setError(null);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (mode === 'login') {
        // Simulate login
        if (values.email === "user@example.com" && (values as z.infer<typeof loginSchema>).password === "password123") {
          console.log("Login successful");
          navigate("/"); // Redirect to homepage on successful login
        } else {
          setError("Invalid email or password.");
        }
      } else {
        // Simulate signup
        console.log("Signup successful (simulated)");
        navigate("/auth?mode=login&signupSuccess=true"); // Redirect to login page with a success message (or directly to dashboard)
      }
      setIsLoading(false);
    }, 1500);
  };

  console.log(`AuthenticationPage loaded in ${mode} mode.`);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary text-primary-foreground rounded-full p-3 w-fit">
             {mode === 'login' ? <LogIn className="h-8 w-8" /> : <UserPlus className="h-8 w-8" />}
          </div>
          <CardTitle className="text-3xl font-bold">
            {mode === 'login' ? 'Welcome Back!' : 'Create an Account'}
          </CardTitle>
          <CardDescription>
            {mode === 'login' ? 'Sign in to access your account.' : 'Join us and start tracking your investments.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {searchParams.get('signupSuccess') && mode === 'login' && (
             <Alert variant="default" className="mb-4 bg-green-100 border-green-300 text-green-700">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Signup Successful!</AlertTitle>
              <AlertDescription>Please log in with your new account.</AlertDescription>
            </Alert>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {mode === 'signup' && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Choose a username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {mode === 'signup' && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (mode === 'login' ? 'Logging in...' : 'Signing up...') : (mode === 'login' ? 'Login' : 'Sign Up')}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          {mode === 'login' ? (
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <RouterLink to="/auth?mode=signup" className="font-medium text-primary hover:underline">
                Sign Up
              </RouterLink>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <RouterLink to="/auth?mode=login" className="font-medium text-primary hover:underline">
                Login
              </RouterLink>
            </p>
          )}
          {mode === 'login' && (
             <RouterLink to="/forgot-password" /* Implement this page if needed */ className="text-sm text-muted-foreground hover:text-primary hover:underline">
                Forgot password?
            </RouterLink>
          )}
           <p className="text-xs text-muted-foreground pt-4">
            Login with <code className="bg-muted px-1 rounded-sm">user@example.com</code> / <code className="bg-muted px-1 rounded-sm">password123</code>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthenticationPage;