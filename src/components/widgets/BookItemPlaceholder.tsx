function BookItemPlaceholder() {
  return (
    <div className="card card-body shadow">
      <div className="container">
        <div className="row placeholder-glow">
          <div
            className="placeholder col-12"
            style={{ minHeight: "240px", width: "85%", margin: "0 auto" }}
          />
          <div
            className="placeholder col-12"
            style={{ minHeight: "17px", marginTop: "7px" }}
          />
          <div
            className="placeholder col-12"
            style={{ minHeight: "51px", marginTop: "7px" }}
          />
          <div className="col-12">
            <div className="row placeholder-glow justify-content-between mt-3">
              <div
                className="placeholder col-9"
                style={{ minHeight: "10px" }}
              />
              <div
                className="placeholder col-2"
                style={{ minHeight: "10px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookItemPlaceholder;
