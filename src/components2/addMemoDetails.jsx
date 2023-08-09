import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Skeleton,
  Table,
  notification,
} from "antd";
import axios from "axios";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PrintIcon from "@mui/icons-material/Print";

function AddMemoDetails() {
  const [form] = Form.useForm();
  const [memoDetails, setMemoDetails] = useState([]);
  const [id, setId] = useState([]);
  const location = useLocation();
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [datas, setDatas] = useState([]);
  const [dataSource, setDataSources] = useState([]);
  const [locationData, setLocation] = useState([]);
  const [consignor, setConsignor] = useState([]);
  const [consignee, setConsignee] = useState([]);
  const [broker, setBroker] = useState([]);
  const [searched, setSearch] = useState([]);
  const [updateId, setUpdateId] = useState("");
  const [vehicle, setVehicle] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${process.env.REACT_APP_URL}/api/memo`);
      const result2 = await axios.get(
        `${process.env.REACT_APP_URL}/api/memodetails`
      );
      const result3 = await axios.get(
        `${process.env.REACT_APP_URL}/api/location?search=${searched}`
      );
      const result4 = await axios.get(
        `${process.env.REACT_APP_URL}/api/consignee?search=${searched}`
      );
      const result5 = await axios.get(
        `${process.env.REACT_APP_URL}/api/consignor?search=${searched}`
      );
      const result6 = await axios.get(
        `${process.env.REACT_APP_URL}/api/broker?search=${searched}`
      );

      const result7 = await axios.get(
        `${process.env.REACT_APP_URL}/api/vehicle?search=${searched}`
      );

      setBroker(get(result6, "data.message"));
      setConsignor(get(result5, "data.message"));
      setConsignee(get(result4, "data.message"));
      setMemoDetails(get(result, "data.message"));
      setDatas(get(result2, "data.message"));
      setLocation(get(result3, "data.message"));
      setVehicle(get(result7, "data.message"));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id) => {
    setUpdateId(id._id);
    setOpen(true);
    form.setFieldsValue(id);
  };

  console.log(memoDetails.filter((res)=>{
    return res._id===id
  })[0]?.date)

  const handleFinish = async (val) => {
    console.log(id,"lll")

  
    if (updateId === "") {
      try {
        const formData = {
          locationfrom: val.locationfrom,
          locationto: val.locationto,
          consignor: val.consignor,
          consignee: val.consignee,
          quantity: val.quantity,
          lramount: val.lramount,
          lotno: val.lotno,
          prnoform: val.prnoform,
          brokername: val.brokername,
          brokercommission: val.brokercommission,
          memomethod: val.memomethod,
          valueofgoods: val.valueofgoods,
          invoiceno: val.invoiceno,
          Prnoto: val.Prnoto,
          lorryfreight: val.lorryfreight,
          accountpaid: val.accountpaid,
          quality: val.quality,
          pressmark: val.pressmark,
          memoId: id,
          date: memoDetails.filter((res)=>{
            return res._id===id
          })[0].date,
          gcno: memoDetails.filter((res)=>{
            return res._id===id
          })[0].gcno,
          vehicleno: memoDetails.filter((res)=>{
            return res._id===id
          })[0].vehicleno,
          pan: vehicle.filter((res) => {
            return memoDetails[0].vehicleno === res.vehicleno;
          })[0]?.pan,
          rcname: vehicle.filter((res) => {
            return memoDetails[0].vehicleno === res.vehicleno;
          })[0]?.rcname,
        };

        await axios.post(
          `${process.env.REACT_APP_URL}/api/memodetails`,
          formData
        );
        notification.success({
          message: "memodetails Added successfully",
        });
        setOpen(false);
        fetchData();
        // form.setFieldsValue([]);
      } catch (err) {
        notification.error({
          message: "Something went wrong",
        });
      }
    } else {
      try {
        console.log(val.memoId)
        const formData = {
          locationfrom: val.locationfrom,
          locationto: val.locationto,
          consignor: val.consignor,
          consignee: val.consignee,
          quantity: val.quantity,
          lramount: val.lramount,
          lotno: val.lotno,
          prnoform: val.prnoform,
          brokername: val.brokername,
          brokercommission: val.brokercommission,
          memomethod: val.memomethod,
          valueofgoods: val.valueofgoods,
          invoiceno: val.invoiceno,
          Prnoto: val.Prnoto,
          lorryfreight: val.lorryfreight,
          accountpaid: val.accountpaid,
          quality: val.quality,
          pressmark: val.pressmark,
          memoId: id,
          date: memoDetails.filter((res)=>{
            return res._id===id
          })[0].date,
          gcno: memoDetails.filter((res)=>{
            return res._id===id
          })[0].gcno,
          vehicleno: memoDetails.filter((res)=>{
            return res._id===id
          })[0].vehicleno,
          pan: vehicle.filter((res) => {
            return memoDetails.filter((res)=>{
              return res._id===id
            })[0].vehicleno === res.vehicleno;
          })[0]?.pan,
          rcname: vehicle.filter((res) => {
            return memoDetails.filter((res)=>{
              return res._id===id
            })[0].vehicleno === res.vehicleno;
          })[0]?.rcname,
        };
        await axios.put(
          `${process.env.REACT_APP_URL}/api/memodetails/${updateId}`,
          formData
        );
        setUpdateId("");
        setOpen(false);
        fetchData();
        notification.success({
          message: "memodetails Updated successfully",
        });
      } catch (err) {
        console.log(err);
        notification.success({
          message: "Something Went wrong",
        });
      }
    }
    console.log("click");
  };

  console.log(datas, "llll");

  useEffect(() => {
    setId(location.pathname.split("/").slice(-1)[0]);

    setFilterData(
      memoDetails.filter((res) => {
        return res._id === id;
      })
    );

    setDataSources(
      datas.filter((res) => {
        return res.memoId === id;
      })
    );

    form.setFieldsValue(filterData[0]);
  }, [memoDetails, datas, filterData[0]]);

  const handleDelete = async (value) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_URL}/api/memodetails/${value._id}`
      );
      fetchData();
      notification.success({
        message: "Deleted Successfully",
      });
    } catch (err) {
      notification.error({
        message: "Something Went Wrong",
      });
    }
  };

  const columns = [
    {
      title: "Location From",
      dataIndex: "locationfrom",
      key: "locationfrom",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Location To",
      dataIndex: "locationto",
      key: "locationto",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Consignor",
      dataIndex: "consignor",
      key: "consignor",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Consignee",
      dataIndex: "consignee",
      key: "consignee",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Lot No",
      dataIndex: "lotno",
      key: "lotno",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "PR NO From",
      dataIndex: "prnoform",

      key: "prnofrom",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "PR NO To",
      dataIndex: "Prnoto",

      key: "prnoto",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "LR Amount",
      dataIndex: "lramount",
      key: "lramount",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Broker Name",
      dataIndex: "brokername",
      key: "brokername",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Broker Commission",
      dataIndex: "brokercommission",

      key: "brokerCommission",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Account Copy",
      dataIndex: "memomethod",
      key: "memomethod",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Lorry Foeight",
      dataIndex: "lorryfreight",
      key: "lorryfreight",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },

    {
      title: "Account Paid",
      dataIndex: "accountpaid",
      key: "accountpaid",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Invoive No",
      dataIndex: "invoiceno",
      key: "invoiceno",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Value of Goods",
      dataIndex: "valueofgoods",
      key: "valueofgoods",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Quality",
      dataIndex: "quality",
      key: "quality",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Press Mark",
      dataIndex: "pressmark",

      key: "PressMark",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Actions",
      render: (text) => (
        <div className="flex gap-1">
          <div>
            <EditNoteOutlinedIcon
              className="!text-md text-[--secondary-color] cursor-pointer"
              onClick={() => handleEdit(text)}
            />
          </div>
          <div>
            <DeleteOutlineOutlinedIcon
              className="!text-md text-[--secondary-color] cursor-pointer "
              onClick={() => {
                handleDelete(text);
              }}
            />
          </div>
          <div>
            <PrintIcon
              className="!text-md text-[--secondary-color] cursor-pointer "
              onClick={() => {
                navigate(`/ccv/${text._id}`);
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="pt-24 pl-[5vw] w-[80vw]">
      <Skeleton loading={loading}>
        <Form
          className="grid grid-cols-3 gap-x-[5vw]"
          layout="vertical"
          form={form}
        >
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Memo/GC No</p>}
            name="gcno"
            rules={[
              {
                required: true,
                message: "Please input your memogc!",
              },
            ]}
          >
            <Input type="number" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Date</p>}
            name="date"
            rules={[
              {
                required: true,
                message: "Please input your date!",
              },
            ]}
          >
            <Input type="date" size="large" />
          </Form.Item>

          <Form.Item
            name="vehicleno"
            label={<p className="!text-[16px] font-semibold">Vehicle No</p>}
          >
            <Select placeholder="Select vehicle no" size="large">
              {/* {vehicle.map((res, i) => {
                return ( */}
              {/* <Select.Option value={res.vehicleno} key={i}>
                    {res.vehicleno}
                  </Select.Option> */}
              {/* );
              })} */}
            </Select>
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold"> Driver Name</p>}
            name="drivername"
            rules={[
              {
                required: true,
                message: "Please input your drivername",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">DriverPhone</p>}
            name="driverphone"
            rules={[
              {
                required: true,
                message: "Please input your driver phone!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={
              <p className="!text-[16px] font-semibold">
                Driver Whatsapp Number
              </p>
            }
            name="driverwhatsappno"
            rules={[
              {
                required: true,
                message: "Please input your driver whtasapp number!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <div className="flex items-end gap-2 justify-end">
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-red-500 w-[130px] float-left text-white font-bold tracking-wider"
              >
                Clear
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-green-600 w-[130px] float-left text-white font-bold tracking-wider"
              >
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Skeleton>
      <div className="w-[80vw]">
        {dataSource.length === 1 ? (
          ""
        ) : (
          <p
            className="bg-[--secondary-color] w-40 float-right text-white text-center rounded-md  h-8 pt-1"
            onClick={() => {
              setOpen(true);
            }}
          >
            Add Memo Details
          </p>
        )}
        <Skeleton loading={loading}>
          <Table
            dataSource={dataSource}
            columns={columns}
            scroll={{
              x: 2200,
            }}
          />
        </Skeleton>
      </div>

      <div>
        <Drawer
          open={open}
          width={500}
          onCancel={() => {
            setOpen(!open);
            form.setFieldValue([]);
          }}
          onClose={() => {
            setOpen(!open);
            form.setFieldValue([]);
            fetchData();
          }}
          footer={false}
          title={<h1 className="pl-8">Add Memo Details</h1>}
        >
          <Form
            className="flex flex-col gap-1"
            layout="vertical"
            onFinish={handleFinish}
            form={form}
          >
            <Form.Item
              label={
                <p className="!text-[16px] font-semibold">Location From</p>
              }
              name="locationfrom"
              rules={[
                {
                  required: true,
                  message: "Please input your from location!",
                },
              ]}
            >
              <Select placeholder="Select location from" size="large">
                {locationData.map((res, i) => {
                  return (
                    <Select.Option value={res.locationname} key={i}>
                      {res.locationname}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label={<p className="!text-[16px] font-semibold">Location To</p>}
              name="locationto"
              rules={[
                {
                  required: true,
                  message: "Please input your to location!",
                },
              ]}
            >
              <Select placeholder="Select location to" size="large">
                {locationData.map((res, i) => {
                  return (
                    <Select.Option value={res.locationname} key={i}>
                      {res.locationname}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label={<p className="!text-[16px] font-semibold">Consignor</p>}
              name="consignor"
              rules={[
                {
                  required: true,
                  message: "Please input your consignor!",
                },
              ]}
            >
              <Select placeholder="Select Consignor" size="large">
                {consignor.map((res, i) => {
                  return (
                    <Select.Option value={res.name} key={i}>
                      {res.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label={<p className="!text-[16px] font-semibold">Consignee</p>}
              name="consignee"
              rules={[
                {
                  required: true,
                  message: "Please input your consignee!",
                },
              ]}
            >
              <Select placeholder="Select Consignee" size="large">
                {consignee.map((res, i) => {
                  return (
                    <Select.Option value={res.name} key={i}>
                      {res.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label={<p className="!text-[16px] font-semibold">Lot No</p>}
              name="lotno"
              rules={[
                {
                  required: true,
                  message: "Please input your driver lot no!",
                },
              ]}
            >
              <Input type="text" size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="!text-[16px] font-semibold">PR No From</p>}
              name="prnoform"
              rules={[
                {
                  required: true,
                  message: "Please input your driver pr no form!",
                },
              ]}
            >
              <Input type="text" size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="!text-[16px] font-semibold">PR No To</p>}
              name="Prnoto"
              rules={[
                {
                  required: true,
                  message: "Please input your pr no to!",
                },
              ]}
            >
              <Input type="text" size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="!text-[16px] font-semibold">Quantity</p>}
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Please input your quantity!",
                },
              ]}
            >
              <Input type="text" size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="!text-[16px] font-semibold">LR Amount</p>}
              name="lramount"
              rules={[
                {
                  required: true,
                  message: "Please input your lr amount",
                },
              ]}
            >
              <Input type="text" size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="!text-[16px] font-semibold">Broker Name</p>}
              name="brokername"
              rules={[
                {
                  required: true,
                  message: "Please input your broker name",
                },
              ]}
            >
              <Select placeholder="Select Broker" size="large">
                {broker.map((res, i) => {
                  return (
                    <Select.Option value={res.brokername} key={i}>
                      {res.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label={
                <p className="!text-[16px] font-semibold">Broker Commission</p>
              }
              name="brokercommission"
              rules={[
                {
                  required: true,
                  message: "Please input your broker commission",
                },
              ]}
            >
              <Input type="text" size="large" />
            </Form.Item>
            <Form.Item
              label={
                <p className="!text-[16px] font-semibold">Account Copy </p>
              }
              name="memomethod"
              rules={[
                {
                  required: true,
                  message: "Please select your account copy",
                },
              ]}
            >
              <Select size="large" placeholder="Account Copy">
                <Select.Option value="Yes">Yes</Select.Option>
                <Select.Option value="No">No</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={
                <p className="!text-[16px] font-semibold">Lorry Freight</p>
              }
              name="lorryfreight"
              rules={[
                {
                  required: true,
                  message: "Please input your lorry freight",
                },
              ]}
            >
              <Input type="text" size="large" />
            </Form.Item>

            <Form.Item
              label={
                <p className="!text-[16px] font-semibold">Account Print</p>
              }
              name="accountpaid"
              rules={[
                {
                  required: true,
                  message: "Please input your account point",
                },
              ]}
            >
              <Select size="large" placeholder="Select account print">
                <Select.Option value="Party">Party</Select.Option>
                <Select.Option value="To pay">To pay</Select.Option>
                <Select.Option value="paid">paid</Select.Option>
                <Select.Option value="fixed">fixed</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label={<p className="!text-[16px] font-semibold">Invoice No</p>}
              name="invoiceno"
              rules={[
                {
                  required: true,
                  message: "Please input your invoice no",
                },
              ]}
            >
              <Input type="text" size="large" />
            </Form.Item>
            <Form.Item
              label={
                <p className="!text-[16px] font-semibold">Value of Goods</p>
              }
              name="valueofgoods"
              rules={[
                {
                  required: true,
                  message: "Please input your value of goods",
                },
              ]}
            >
              <Input type="text" size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="!text-[16px] font-semibold">Quality</p>}
              name="quality"
              rules={[
                {
                  required: true,
                  message: "Please input your quality",
                },
              ]}
            >
              <Input type="text" size="large" />
            </Form.Item>
            <Form.Item
              label={<p className="!text-[16px] font-semibold">Press Mark</p>}
              name="pressmark"
              rules={[
                {
                  required: true,
                  message: "Please input your press mark",
                },
              ]}
            >
              <Input type="text" size="large" />
            </Form.Item>
            <div className="flex items-end gap-2 justify-end">
              <Form.Item>
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="bg-red-500 w-[130px] float-left text-white font-bold tracking-wider"
                >
                  Cancel
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="bg-green-600 w-[130px] float-left text-white font-bold tracking-wider"
                >
                  {updateId === "" ? "Save" : "Update"}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Drawer>
      </div>
    </div>
  );
}

export default AddMemoDetails;
