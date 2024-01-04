import {MapPin} from "lucide-react";
import {IAddTripInput} from "@/interfaces/IAddTripInput";


const AddTripInput = ({
                          inputRef,
                          origin,
                          destination,
                          placeholder,
                          name,
                          setDisable,
                          setPassengers,
                          distance,
                          duration,
                          calculateDistance
                      }: IAddTripInput) => {

    const handleChange = (event: any) => {
        if (event.target.value === "") {
            setDisable(true)
            // setPrice(0)
            setPassengers(1)
            distance = 0
            duration = 0
        } else {
            if (!origin?.current?.value || !destination?.current?.value) return

            console.log(origin?.current?.value)
            console.log(destination?.current?.value)

            destination?.current?.value && calculateDistance()
            setDisable(false)
        }
    };

    return (
        <div className="relative w-full h-12 lg:h-16 rounded-md">
            <div
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <MapPin/>
            </div>
            {/*<Autocomplete*/}
            {/*    onLoad={() => {*/}
            {/*        // console.log(autoComplete)*/}
            {/*    }}*/}
            {/*    onPlaceChanged={() => {*/}
            {/*        if (!origin.current.value || !destination.current.value) return*/}
            {/*        destination.current.value && calculateDistance()*/}
            {/*    }}*/}
            {/*>*/}
            <input
                type="text"
                name={name}
                id={name}
                className="block w-full h-12 lg:h-16 rounded-md border border-gray-300 py-1.5 pl-10 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 alk-sanet"
                placeholder={placeholder}
                ref={inputRef}
                onChange={handleChange}
            />
            {/*</Autocomplete>*/}
        </div>
    );
};

export default AddTripInput;
