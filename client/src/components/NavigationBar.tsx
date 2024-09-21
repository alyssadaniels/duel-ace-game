import { Link, useNavigate } from "react-router-dom";

/**
 * Nav bar
 * @param interceptNavigation whether should confirm before navigation - default false
 * @returns NavigationBar component
 */
export default function NavigationBar({
    interceptNavigation = false,
}: {
    interceptNavigation?: boolean;
}) {
    const navigate = useNavigate();

    return (
        <div className="w-full border-b-2 border-plum-2 py-4 px-8">
            <Link
                to={"/"}
                onClick={(event) => {
                    if (interceptNavigation) {
                        event.preventDefault();

                        // prompt
                        let confirmation = confirm(
                            "Leave game? You will not be able to rejoin"
                        );

                        if (confirmation) {
                            navigate("/");
                        }
                    }
                }}
            >
                DUEL <span className="text-dandelion-1 font-bold">ACE</span>
            </Link>
        </div>
    );
}
