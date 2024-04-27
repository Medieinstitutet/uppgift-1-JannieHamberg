
import { Link } from "react-router-dom";

export const ErrorComponent = () => { 
    const colors = [ "#ffcf05", "#662eb5", "#0cc0df", "#34a612", "#df4e80", "#ffcf05", "#662eb5"];

    const colorful = "pixel".split("").map((char, index) => {
        return <span key={index} style={{ color: colors[index % colors.length] }}>{char}</span>;
      });
    return (
        <div className="flex items-center flex-col justify-center h-screen">
            <div className="helloContainer text-center ">
            <h3 className="helloUser text-sm sm:text-2xl mx-auto">Looks like we took a wrong turn in the {colorful} jungle!</h3>
            </div>

            <div className="content-center flex flex-col">
                <h4 className=" text-sm sm:text-2xl mb-10">Click here for a guided tour home &#129312;</h4>
                <button className="HomePageButton2 self-center text-sm sm:text-2xl">
                    <Link to="/">Click Me!</Link>
                </button>
            </div>
        </div>
    )
};