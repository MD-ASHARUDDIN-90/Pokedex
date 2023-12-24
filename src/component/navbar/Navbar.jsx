import { DownOutlined, UserOutlined } from "@ant-design/icons";
import style from "./Navbar.module.css";

import { Button, Dropdown, Input, Space, message } from "antd";
const { Search } = Input;

const Navbar = ({ onSearch, setSelectedType }) => {
  const handleMenuClick = (e) => {
    let selectedLabel = items.find((item) => item.key === e.key)?.label;
    if (selectedLabel === "Select") {
      selectedLabel = "";
    }
    message.success(`Filtering by type: ${selectedLabel}`);
    setSelectedType(selectedLabel);
  };

  const items = [
    {
      label: "Select",
      key: "0",
    },
    {
      label: "water",
      key: "1",
    },
    {
      label: "fire",
      key: "2",
    },
    {
      label: "normal",
      key: "3",
    },
    {
      label: "flying",
      key: "4",
    },
    {
      label: "bug",
      key: "5",
    },
    {
      label: "poison",
      key: "6",
    },
    {
      label: "electric",
      key: "7",
    },
    {
      label: "ground",
      key: "8",
    },
    {
      label: "grass",
      key: "9",
    },
    {
      label: "fairy",
      key: "10",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleSearch = (value) => {
    console.log(value);
    if (value !== undefined && value !== null) {
      onSearch(value.toLowerCase());
    } else {
      onSearch("");
    }
  };

  return (
    <div className={style.navbar}>
      <h2>Pokedex</h2>
      <div className={style.option}>
        <Search
          placeholder='Search Pokemon Name or Id'
          allowClear
          enterButton='Search'
          size='medium'
          onSearch={handleSearch}
          onChange={(e) => {
            if (e.target.value === "") {
              handleSearch("");
            }
          }}
          className={style.searchbar}
        />

        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              Filter
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <h2>Pokedex</h2>
      </div>
    </div>
  );
};
export default Navbar;
