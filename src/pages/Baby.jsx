    import { useEffect, useState } from "react";
    import { useParams } from "react-router-dom"
    import getBaby from "../api/BabyApi";
    import BabyProfile from "../pages/BabyProfile.jsx"
    import EmptyBabyState from "../components/EmptyBabyState.jsx"
    import BabyFormModal from "../components/modals/BabyFormModal.jsx"
    import { Spinner } from "flowbite-react";
    
    function Baby() {
        const { id } = useParams();
        const [ baby, setBaby ] = useState(null);
        const [ hasBaby, setHasBaby ] = useState(true)
        const [createOpen, setCreateOpen] = useState(false)
    
        async function loadBaby() {
            try {
                const data = await getBaby(id)
                setBaby(data);
                setHasBaby(true)
            } catch(error) {
                if (error.status === 404) {
                    setBaby(null);
                    setHasBaby(false)
                } else {
                    console.error(error)
                }
            }
        }
    
    
        useEffect(() => {
            loadBaby();
        }, [id]);

        if (!hasBaby) {
            return (
                <>
                <EmptyBabyState
                    onCreateClick={()=> setCreateOpen(true)}
                />
                <BabyFormModal
                    mode="create"
                    open={createOpen}
                    onClose={() => setCreateOpen(false)}
                    onSaved={loadBaby}
                />
                </>
            );
        }
    
        return <BabyProfile
            baby={baby}
            loadBaby={loadBaby}
        />
    }
    
    export default Baby;
