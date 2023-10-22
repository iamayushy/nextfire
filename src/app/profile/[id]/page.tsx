
type IdPageProps = {
    id: string
}

export default function UserProfile ({params}: {params: IdPageProps}) {
    return (
        <div>  
            Id Page {params.id}
        </div>
    )
} 