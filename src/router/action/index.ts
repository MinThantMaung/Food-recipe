import { redirect, type ActionFunctionArgs } from "react-router";
import { AxiosError } from "axios";

export const loginAction = async ({request} : ActionFunctionArgs) => {
    //const formData = await request.formData();
    //  const credentials: Record<string, FormDataEntryValue> = {};

    // formData.forEach((value, key) => {
    //     credentials[key] = value;
    // });
    try{
        //api
        const redirectTo = new URL(request.url).searchParams.get("redirect") || "/"
        return redirect(redirectTo)
    }catch(error){
        if (error instanceof AxiosError) {
            if (error.response) {
                return { error: error.response.data.message };
            }
        }
    }
    
}

export const registerAction = async ({request} : ActionFunctionArgs) =>{

    try{
        return redirect("/register/verify-otp")
    }catch(error){
        if (error instanceof AxiosError) {
            if (error.response) {
                return { error: error.response.data.message };
            }
        }
    }
}

export const verifyOtpAction = async ({request} : ActionFunctionArgs) =>{

    try{
        return redirect("/register/confirm-password")
    }catch(error){
        if (error instanceof AxiosError) {
            if (error.response) {
                return { error: error.response.data.message };
            }
        }
    }
}

export const confirmPasswordAction = async ({request} : ActionFunctionArgs) =>{

    try{
        return redirect("/");
    }catch(error){
        if (error instanceof AxiosError) {
            if (error.response) {
                return { error: error.response.data.message };
            }
        }
    }
}