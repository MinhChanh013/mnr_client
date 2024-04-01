import {
  BookOutlined,
  BoxPlotOutlined,
  ClusterOutlined,
  FileTextOutlined,
  GoldOutlined,
  InboxOutlined,
  RadarChartOutlined,
  ReconciliationOutlined,
  SettingOutlined,
  ShareAltOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const itemsMenu = [
  {
    label: "Thông điệp",
    key: "Message",
    icon: (
      <lord-icon
        className="User"
        colors="outline:#fff,primary:#fff"
        src="https://cdn.lordicon.com/zrtfxghu.json"
        trigger="loop-on-hover"
        delay="200"
      ></lord-icon>
    ),
    child: [
      {
        label: "Dùng chung",
        icon: <ShareAltOutlined />,
        key: "message:1",
        child: [
          {
            href: "/msg211_common",
            key: "message:1:1",
            label: "Sơ đồ vị trí xếp dỡ",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/gyblqrqz.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg253_common",
            key: "message:1:2",
            label: "253- Tàu xuất/ nhập cảnh",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg217_common",
            key: "message:1:3",
            label: "217- Container rút hàng",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg252_common",
            key: "message:1:4",
            label: "252 - Hàng hóa vào kho qua TKVC",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg367_common",
            key: "message:1:5",
            label: "367 - Tờ khai hàng hóa chưa getin",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/lyrrgrsl.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg901_common",
            key: "message:1:6",
            label: "901 - Thông tin biên lai thu phí",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/lyrrgrsl.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg_history",
            key: "message:1:7",
            label: "Truy vấn thông điệp",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/lyrrgrsl.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
        ],
      },
      {
        label: "Hàng Container",
        icon: <BoxPlotOutlined />,
        key: "message:2",
        child: [
          {
            href: "/msg212_container",
            key: "message:2:1",
            label: "212 - Container được dỡ xuống cảng",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg566_container",
            key: "message:2:2",
            label: "566 - Xin số định danh hàng container",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/lyrrgrsl.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg214_container",
            key: "message:2:3",
            label: "214 - Danh sách container sai khác",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/lyrrgrsl.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg213_container",
            key: "message:2:4",
            label: "213 - Danh sách Container soi chiếu trước",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/lyrrgrsl.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg3668_container",
            key: "message:2:5",
            label: "366.8 - Container Getin",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg3665_container",
            key: "message:2:6",
            label: "366.5 - Hiệu chỉnh Container Getin",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/pflszboa.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg3661_container",
            key: "message:2:7",
            label: "366.1 - Hủy Container Getin",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/wpyrrmcq.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg237_container",
            key: "message:2:8",
            label: "237 - Thay đổi chì niêm phong Container",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg247_container",
            key: "message:2:9",
            label: "247 - Điều hướng Container",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/swcqkzdc.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg363_container",
            key: "message:2:10",
            label: "363 - Container đủ điều kiện qua KVGS",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg367_container",
            key: "message:2:11",
            label: "367 - TK đủ điều kiện qua KVGS",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg365_container",
            key: "message:2:12",
            label: "365 - Container Getout có TKHQ",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg465_container",
            key: "message:2:13",
            label: "465 - Container Getout không TKHQ",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg214_container_CSHT",
            key: "message:2:14",
            label: "[CSHT].214 - Tờ khai chưa nộp phí",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg365_container_CSHT",
            key: "message:2:15",
            label: "[CSHT].365 - Container Getout",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
        ],
      },
      {
        label: "Hàng kiện",
        icon: <InboxOutlined />,
        key: "message:3",
        child: [
          {
            href: "/msg212_package",
            key: "message:3:1",
            label: "212 - Hàng kiện được dỡ xuống cảng",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg566_package",
            key: "message:3:2",
            label: "566 - Xin số định danh cho hàng kiện",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg215_package",
            key: "message:3:3",
            label: "215 - Danh sách hàng kiện sai khác",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg2668_package",
            key: "message:3:4",
            label: "266.8 - Hàng kiện Getin",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg207_package",
            key: "message:3:5",
            label: "207 - Xác nhận getin hết hàng",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg2665_package",
            key: "message:3:6",
            label: "266.5 - Hiệu chỉnh hàng kiện Getin",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/pflszboa.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg2661_package",
            key: "message:3:7",
            label: "266.1 - Hủy hàng kiện Getin",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/wpyrrmcq.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg257_package",
            key: "message:3:8",
            label: "257 - Điều hướng hàng kiện",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/rsbokaso.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg297_package",
            key: "message:3:9",
            label: "297 - Chỉ định tờ khai xuất khẩu",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg367_package",
            key: "message:3:10",
            label: "367 - TK đủ điều kiện qua KVGS",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg223_package",
            key: "message:3:11",
            label: "223 - Hàng kiện đủ điều kiện qua KVGS",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg321_package",
            key: "message:3:12",
            label: "321 - Hàng kiện Getout có TKHQ",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg341_package",
            key: "message:3:13",
            label: "341 - Hàng kiện Getout không TKHQ",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg215_package_CSHT",
            key: "message:3:14",
            label: "215[CSHT] - TK chưa nộp phí",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            href: "/msg321_package_CSHT",
            key: "message:3:15",
            label: "321[CSHT] - Hàng kiện Getout có TKHQ",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
        ],
      },
      {
        label: "Hàng rời",
        icon: <GoldOutlined />,
        key: "message:4",
        child: [
          {
            key: "message:4:1",
            label: "212 - Hàng kiện được dỡ xuống cảng",
            icon: (
              <lord-icon
                src="https://lordicon.com/icons/system/regular?group=free&categoryId=144"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:4:2",
            label: "566 - Xin số định danh cho hàng rời",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:4:3",
            label: "216 - Danh sách hàng rời sai khác",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:4:4",
            label: "466.8 - Hàng rời Getin",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:4:5",
            label: "207 - Xác nhận getin hết hàng",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:4:6",
            label: "466.5 - Hiệu chỉnh hàng rời Getin",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/pflszboa.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:4:7",
            label: "466.1 - Hủy Getin hàng rời",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/wpyrrmcq.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:4:8",
            label: "267 - Điều hướng hàng rời",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/rsbokaso.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:4:9",
            label: "297 - Chỉ định tờ khai xuất khẩu",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:4:10",
            label: "367 - TK đủ điều kiện qua KVGS",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:4:11",
            label: "223 - Hàng kiện đủ điều kiện qua KVGS",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:4:12",
            label: "421 - Hàng rời Getout có TKHQ",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:4:13",
            label: "441 - Hàng rời Getout không TKHQ",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:4:14",
            label: "216[CSHT] - TK chưa nộp phí",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:4:15",
            label: "421[CSHT] - Hàng rời Getout có TKHQ",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
        ],
      },
      {
        label: "Hàng lỏng",
        icon: <ReconciliationOutlined />,
        key: "message:5",
        child: [
          {
            label: "212 - Hàng kiện được dỡ xuống cảng",
            key: "message:5:1",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            label: "566 - Xin số định danh cho hàng lỏng",
            key: "message:5:2",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:5:3",
            label: "226 - Danh sách hàng lỏng sai khác",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:5:4",
            label: "166.8 - Hàng lỏng Getin",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:5:5",
            label: "207 - Xác nhận getin hết hàng",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:5:6",
            label: "166.5 - Hiệu chỉnh hàng lỏng Getin",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/pflszboa.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:5:7",
            label: "166.1 - Hủy Getin hàng lỏng",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/wpyrrmcq.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:5:8",
            label: "277 - Điều hướng hàng lỏng",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/pflszboa.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:5:9",
            label: "297 - Chỉ định tờ khai xuất khẩu",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:5:10",
            label: "367 - TK đủ điều kiện qua KVGS",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:5:11",
            label: "223 - Hàng lỏng đủ điều kiện qua KVGS",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:5:12",
            label: "121 - Hàng lỏng Getout có TKHQ",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            key: "message:5:13",
            label: "141 - Hàng rời Getout không TKHQ",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
        ],
      },
    ],
  },
  {
    label: "Danh mục",
    key: "Directory",
    icon: (
      <lord-icon
        className="Directory"
        colors="outline:#fff,primary:#fff"
        src="https://cdn.lordicon.com/nizfqlnk.json"
        trigger="loop-on-hover"
        delay="200"
      ></lord-icon>
    ),
    child: [
      {
        label: "Container",
        key: "container1",
        icon: <BoxPlotOutlined />,
        child: [
          {
            href: "/ContainerMNF",
            label: "Manifest - Loading list",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
            key: "directory:1",
          },
          {
            href:"/ContainerStock",
            label: "Thông tin container biến động",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/lyrrgrsl.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
            key: "directory:2",
          },
          {
            href:"/ContainerSizeType",
            label: "Loại và kích cỡ container",
            key: "directory:3",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/qzlhsleu.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
        ],
      },
      {
        label: "Hàng kiện",
        key: "container2",
        icon: <InboxOutlined />,
        child: [
          {
            href:"/PackageMNF",
            label: "Manifest - Loading list",
            key: "directory:4",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            href:"/PackageGetin",
            label: "Thông tin hàng kiện getin",
            key: "directory:5",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/rbbnmpcf.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            href:"/PackageGetout",
            label: "Thông tin hàng kiện getout",
            key: "directory:6",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/ijahpotn.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
        ],
      },
      {
        label: "Hàng rời",
        key: "container3",
        icon: <GoldOutlined />,
        child: [
          {
            href:"/BulkMNF",
            label: "Manifest - Loading list",
            key: "directory:7",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            href:"/BulkGetin",
            label: "Thông tin hàng rời getin",
            key: "directory:8",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/rbbnmpcf.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            href:"/BulkGetout",
            label: "Thông tin hàng rời getout",
            key: "directory:9",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/ijahpotn.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
        ],
      },
      {
        label: "Hàng lỏng",
        key: "container4",
        icon: <ReconciliationOutlined />,
        child: [
          {
            href:"/LiquidMNF",
            label: "Manifest - Loading list",
            key: "directory:10",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            href:"/LiquidGetin",
            label: "Thông tin hàng lỏng getin",
            key: "directory:11",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/rbbnmpcf.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            href:"/LiquidGetout",
            label: "Thông tin hàng lỏng getout",
            key: "directory:12",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/ijahpotn.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            href:"/LiquidType",
            label: "Loại hàng lỏng",
            key: "directory:13",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/eouimtlu.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
        ],
      },
      {
        label: "Thông tin tàu",
        key: "infor",
        icon: <BookOutlined />,
        child: [
          {
            label: "Thông tin chuyến tàu",
            key: "directory:14",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            label: "Đồng bộ thông tin tàu",
            key: "directory:15",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/ercyvufy.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
        ],
      },
      {
        label: "Danh mục",
        key: "list",
        icon: <UnorderedListOutlined />,
        child: [
          {
            label: "Danh mục phương án",
            key: "directory:16",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            label: "Danh mục đơn vị tính",
            key: "directory:17",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/rguiapej.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            label: "Danh mục Chi cục Hải quan",
            key: "directory:18",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/tzdwqlbp.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
        ],
      },
    ],
  },
  {
    label: "Báo cáo - Thống kê",
    key: "Statistic",
    icon: (
      <lord-icon
        className="Statistic"
        colors="outline:#fff,primary:#fff"
        src="https://cdn.lordicon.com/whrxobsb.json"
        trigger="loop-on-hover"
        delay="200"
      ></lord-icon>
    ),
    child: [
      {
        label: "Thống kê",
        icon: <FileTextOutlined />,
        key: "statistic:1",
        child: [
          {
            label: "Tờ khai HQ",
            key: "statistic:1:1",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/zrtfxghu.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            label: "Thống kê sản lượng",
            key: "statistic:1:2",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/pqirzoux.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            label: "Báo cáo container nhập xuất",
            key: "statistic:1:3",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vdjwmfqs.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
        ],
      },
      {
        icon: <RadarChartOutlined />,
        label: "Báo cáo cảng",
        key: "statistic:2",
        child: [],
      },
      {
        icon: <ReconciliationOutlined />,
        label: "Báo cáo hải quan",
        key: "statistic:3",
        child: [],
      },
    ],
  },
  {
    label: "Hệ thống",
    key: "User",
    icon: (
      <lord-icon
        className="User"
        colors="outline:#fff,primary:#fff"
        src="https://cdn.lordicon.com/lecprnjb.json"
        trigger="loop-on-hover"
        delay="200"
      ></lord-icon>
    ),
    child: [
      {
        label: "Người dùng",
        icon: <UserOutlined />,
        key: "user:1",
        child: [
          {
            label: "Quản lý người dùng",
            key: "user:1:1",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/kthelypq.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              />
            ),
          },
          {
            label: "Phân quyền người dùng",
            key: "user:1:2",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/kddybgok.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
        ],
      },
      {
        icon: <ClusterOutlined />,
        label: "Cấu hình",
        key: "user:2",
        child: [],
      },
      {
        icon: <SettingOutlined />,
        label: "Cài đặt",
        key: "user:3",
        child: [
          {
            label: "Lịch sử đăng nhập",
            key: "history",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/vuiggmtc.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            label: "Quản lý thông điệp",
            key: "manage",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/xtnsvhie.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            label: "Cấu hình hệ thống",
            key: "system",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/lecprnjb.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
          {
            label: "Cấu hình gửi thông điệp",
            key: "logout",
            icon: (
              <lord-icon
                src="https://cdn.lordicon.com/fdxqrdfe.json"
                colors="outline:#fff,primary:#fff"
                trigger="loop-on-hover"
                delay="200"
              ></lord-icon>
            ),
          },
        ],
      },
    ],
  },
];

export const FORMAT_DATETIME = "YYYY-MM-DD HH:mm:ss";
export const ev_code = [
  "MESSAGE_TRANSMIT_FAILED",
  "ASKING_MESSAGE_CREATION_FAILED",
  "REQUEST_ABORTED",
  "MESSAGE_DESERIALISE_FAILED",
  "RESPONSE_TIMED_OUT",
];
