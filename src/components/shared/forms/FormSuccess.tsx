import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {CheckSquare} from "lucide-react";

interface FormSuccessProps {
    message?: string | undefined;
}

const FormSuccess = ({message}: FormSuccessProps) => {

    if (!message) return null;

    return (
        <Alert variant="success" className="alk-sanet">
            <CheckSquare className="h-4 w-4"/>
            <AlertTitle/>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>
    );
};

export default FormSuccess;