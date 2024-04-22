export function AddressCard() {
    const truncate = (string) => {
        return string[0];
    };
    return (
        <div className="card">
            <div className="card-body text-start">
                <label className="">
                    <div className="d-flex flex-row">
                        <input className="align-self-center" type="checkbox" />
                        <p className="ps-2 m-0">Make default</p>
                    </div>
                </label>
                <div className="row mt-3">
                    <p className="card-text">Address Line 1</p>
                    <p className="card-text">Address Line 2</p>
                    <p className="card-text">Address Line 3</p>
                </div>
                <div>
                    <button>Edit</button>
                </div>
            </div>
        </div>
    );
}
