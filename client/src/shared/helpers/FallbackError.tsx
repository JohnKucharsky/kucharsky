export default function FallbackError({ error }: { error: any }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{JSON.stringify(error, null, 2)}</pre>
        </div>
    );
}
