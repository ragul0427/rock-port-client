import React, { useEffect, useState } from "react";
import SideNavbar from "../sideNavbar.jsx";
import {
  Space,
  Table,
  Tag,
  Select,
  Modal,
  Form,
  Input,
  Button,
  notification,
} from "antd";
import axios from "axios";
import { get } from "lodash";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function Memodetails() {
  const [Memo, setMemo] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateId, setUpdateId] = useState("");
  const [searched, setSearched] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:4001/api/memo?search=${searched}`);
      setMemo(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    fetchData();
  }, [searched]);

  const handleSubmit = async (value) => {
    if (updateId === "") {
      try {
        await axios.post("http://localhost:4001/api/memo", value);
        fetchData();
        notification.success({ message: "memo Added successfully" });
        setOpen(false);
      } catch (err) {
        notification.error({ message: "Something went wrong" });
      }
    } else {
      try {
        await axios.put(
          `http://localhost:4001/api/memo/${updateId}`,
          value
        );
        fetchData();
        notification.success({ message: "memo updated successfully" });
        setOpen(false);
        form.setFieldValue([]);
        setUpdateId("");
      } catch (err) {
        notification.error({ message: "Something went wrong" });
      }
    }
  };

  const handleEdit = (value) => {
    form.setFieldsValue(value);
    setUpdateId(value._id);
    setOpen(true);
  };

  const handleDelete = async(value) => {
    try {
      await axios.delete(`http://localhost:4001/api/memo/${value._id}`)
      fetchData()
      notification.success({message:"Deleted Successfully"})
    } catch (err) {
      notification.error({message:"Something Went Wrong"})
    }
  }

  const columns = [
    {
        title: "Location From",
        dataIndex: "Location From",
        key: "Location From",
        render: (text) => <div className="!text-[16px]">{text}</div>,
      },
  
    {
      title: "Location To",
      dataIndex: "Location To",
      key: "Location To",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },

    {
      title: "Consignor",
      dataIndex: "Consignor",
      key: "Consignor",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },

    {
        title: "Consignee",
        dataIndex: "Consignee",
        key: "Consignee",
        render: (text) => <div className="!text-[16px]">{text}</div>,
      },

      {
        title: "Lot No",
        dataIndex: "Lot No",
        key: "Lot No",
        render: (text) => <div className="!text-[16px]">{text}</div>,
      },
  
      {
        title: "PR NO From",
        dataIndex: " PR NO From",
        key: "PR NO From",
        render: (text) => <div className="!text-[16px]">{text}</div>,
      },
      {
        title: "PR NO To",
        dataIndex: " PR NO To",
        key: "PR NO To",
        render: (text) => <div className="!text-[16px]">{text}</div>,
      },
  
      {
        title: "Quantity",
        dataIndex: " Quantity",
        key: "Quantity",
        render: (text) => <div className="!text-[16px]">{text}</div>,
      },
  
      {
        title: "LR Amount",
        dataIndex: " LR Amount",
        key: "LR Amount",
        render: (text) => <div className="!text-[16px]">{text}</div>,
      },
  {
      title: "Broker Name",
      dataIndex: "broker Name",
      key: "broker name",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
        title: "Broker Commission",
        dataIndex: "broker Commission",
        key: "broker Commission",
        render: (text) => <div className="!text-[16px]">{text}</div>,
      },
      {
        title: "Memo Method",
        dataIndex: "Memo Method",
        key: "Memo Method",
        render: (text) => <div className="!text-[16px]">{text}</div>,
      },

    {
      title: "Lorry Foeight",
      dataIndex: "lorry foeight",
      key: "lorr foeight",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
        title: "Account Paid",
        dataIndex: "account paid",
        key: "account paid",
        render: (text) => <div className="!text-[16px]">{text}</div>,
      },
      {
        title: "Invoive No",
        dataIndex: "invoice no",
        key: "invoice no",
        render: (text) => <div className="!text-[16px]">{text}</div>,
      },

      {
        title: "Value of Goods",
        dataIndex: "value of goods",
        key: "value of goods",
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
        dataIndex: "Press Mark",
        key: "Press Mark",
        render: (text) => <div className="!text-[16px]">{text}</div>,
      },

    {
      title: "Actions",
      render: (text) => (
        <div className="flex gap-1">
          <div>
            <EditNoteOutlinedIcon
              className="!text-md text-green-500 cursor-pointer"
              onClick={() => handleEdit(text)}
            />
          </div>

          <div>
            <DeleteOutlineOutlinedIcon className="!text-md text-green-500 cursor-pointer " onClick={()=>{handleDelete(text)}} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex pt-[15vh] pl-4">
      <div className="w-[75vw] flex flex-col gap-10">
        <div className="flex items-center justify-center">
        <Input
        placeholder="Search here"
        size="large"
        className="w-[50%] !m-auto py-3"
        onChange={(e) => {
          setSearched(e.target.value);
        }}/>
        </div>
        <div className="  w-full"> 
          <div
            className="float-right w-[120px] py-1 rounded-md cursor-pointer text-white font-bold  flex items-center justify-center bg-green-500"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddOutlinedIcon /> Create
          </div>
        </div>
        <Table columns={columns} dataSource={Memo} />
      </div>
      <Modal
        open={open}
        width={700}
        onCancel={() => {
          setOpen(!open);
          form.setFieldValue([]);
          setUpdateId("");
        }}
        footer={false}
      >
        <Form
          className="grid grid-cols-2 gap-4"
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Location From </p>}
            name="location from"
            rules={[
              {
                required: true,
                message: "Please input your from location!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Location To</p>}
            name="location to"
            rules={[
              {
                required: true,
                message: "Please input your to location!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold"> Consignor </p>}
            name="consignor"
            rules={[
              {
                required: true,
                message: "Please input your consignor!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item label={<p className="!text-[16px] font-semibold">Consignee</p>}
           name="consignee"
        rules={[
            {
                required: true,  
                message: "Please input your consignee!",
              },
          ]}
          >
            <Input type="text" size="large" />
            </Form.Item> 

          <Form.Item
            label={<p className="!text-[16px] font-semibold">Lot No</p>}
            name="Lot no"
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
            label={<p className="!text-[16px] font-semibold"> PR No From</p>}
            name="pr no form"
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
            name="Pr no to"
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
          <Form.Item label={<p className="!text-[16px] font-semibold">LR Amount</p>}
           name="lr amount"
        rules={[
            {
                required: true,  
                message: "Please input your lr amount",
              },
          ]}
          >
             <Input type="text" size="large" />
          </Form.Item>

          <Form.Item label={<p className="!text-[16px] font-semibold">Broker Name</p>}
           name="broker name"
        rules={[
            {
                required: true,  
                message: "Please input your broker name",
              },
          ]}
          >
             <Input type="text" size="large" />
          </Form.Item>

          <Form.Item label={<p className="!text-[16px] font-semibold">Broker Commission</p>}
           name="broker commission"
        rules={[
            {
                required: true,  
                message: "Please input your broker commission",
              },
          ]}
          >
             <Input type="text" size="large" />
          </Form.Item>

          <Form.Item label={<p className="!text-[16px] font-semibold">Memo Method</p>}
           name="memo method"
        rules={[
            {
                required: true,  
                message: "Please select your memo method",
              },
              <Select size="large">
              <Select.Option value="to pay">To Pay</Select.Option>
              <Select.Option value="tbb">TBB</Select.Option>
            </Select>
          ]}
          >
             <Input type="text" size="large" />
          </Form.Item>

          <Form.Item label={<p className="!text-[16px] font-semibold">Lorry Foeight</p>}
           name="lorry foeight "
        rules={[
            {
                required: true,  
                message: "Please input your lorry foeight",
              },
          ]}
          >
             <Input type="text" size="large" />
          </Form.Item>

          <Form.Item label={<p className="!text-[16px] font-semibold">Remarks</p>}
           name="remarks"
        rules={[
            {
                required: true,  
                message: "Please input remarks",
              },
              <Select size="large">
              <Select.Option value="party">Party</Select.Option>
              <Select.Option value="topay">To Pay</Select.Option>
              <Select.Option value="paid">Paid</Select.Option>
              <Select.Option value="fixed">Fixed</Select.Option>
            </Select>
          ]}
          >
             <Input type="text" size="large" />
          </Form.Item>
          <Form.Item label={<p className="!text-[16px] font-semibold">Account Point</p>}
           name="account point"
        rules={[
            {
                required: true,  
                message: "Please input your account point",
              },
              <Select size="large">
              <Select.Option value="Yes">Yes</Select.Option>
              <Select.Option value="no">no</Select.Option>
            </Select>
          ]}
          >
             <Input type="text" size="large" />
          </Form.Item>

          <Form.Item label={<p className="!text-[16px] font-semibold">Invoice No</p>}
           name="invoice no"
        rules={[
            {
                required: true,  
                message: "Please input your invoice no",
              },
          ]}
          >
             <Input type="text" size="large" />
          </Form.Item>
          <Form.Item label={<p className="!text-[16px] font-semibold">Value of Goods</p>}
           name="value of goods"
        rules={[
            {
                required: true,  
                message: "Please input your value of goods",
              },
          ]}
          >
             <Input type="text" size="large" />
          </Form.Item>
       
          <Form.Item label={<p className="!text-[16px] font-semibold">Quality</p>}
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
       
          <Form.Item label={<p className="!text-[16px] font-semibold">Press Mark</p>}
           name="press mark"
        rules={[
            {
                required: true,  
                message: "Please input your press mark",
              },
          ]}
          >
             <Input type="text" size="large" />
          </Form.Item>
       
 <div className="save">
          <Form.Item className="w-[40vw]">
            <Button
              htmlType="submit"
              className="bg-green-500 w-[130px] float-left text-white font-bold tracking-wider"
            >
              {updateId === "" ? "Save" : "Update"}
            </Button>
          </Form.Item>
 </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Memodetails;