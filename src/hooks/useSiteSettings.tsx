import SiteSettingsContext from "@/context/siteSettingsContext";
import {useContext} from "react";

const useSiteSettings = () => useContext(SiteSettingsContext)

export default useSiteSettings;