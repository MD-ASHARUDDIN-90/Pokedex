import { useState } from "react";
import Container from "./component/container/Container";
import Navbar from "./component/navbar/Navbar";
import SearchResults from "./component/searchResult/SearchResult";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "white",
        }}
      >
        <Navbar
          onSearch={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>
      <div>
        {searchTerm ? (
          <SearchResults searchTerm={searchTerm} />
        ) : (
          <Container selectedType={selectedType} />
        )}
      </div>
    </div>
  );
}

export default App;
