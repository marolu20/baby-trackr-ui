import BabyProfile from "../../pages/BabyProfile.jsx"

export function BabyProfileTab({baby, loadBaby}) {
    return (
        <BabyProfile
            baby={baby}
            loadBaby={loadBaby}
            />
    )
}

export default BabyProfileTab;
