import { Button } from '@/components/Button';
import { MoveRight, Apple } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';
export default function Widget1() {
    return (
        <div className="p-4 w-full h-fit flex  justify-center bg-gray-100 min-h-screen">
            <div className="flex flex-col gap-4 w-full max-w-md">
                <Button
                    variant="primary"
                    className="w-full"
                    rightIcon={<MoveRight className="h-4 w-4" />}
                >
                    Get started
                </Button>
                <Button
                    variant="primary"
                    className="w-full"
                    leftIcon={<Apple className="h-4 w-4" />}
                >
                    Get started
                </Button>
                <Button
                    variant="outline"
                    className="w-full"
                    leftIcon={<FaFacebook className="h-5 w-5" />}
                >
                    Continue with Facebook
                </Button>
                <Button
                    variant="outline"
                    className="w-full"
                    leftIcon={<FaFacebook className="h-5 w-5" />}
                >
                    Continue with google
                </Button>
            </div>
        </div>
    );
}
