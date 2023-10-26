"use client";
import "../../styles/globals.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";

const MenuSelectedProduct = ({
  user,
  selectedProduct,
  flavors,
  sprinkles,
  colors,
  flowers,
  shapes,
}) => {
  const [size, setSize] = useState({
    packagingId: 0,
    packagingPrice: 0,
    size: "",
  });
  const [flavor, setFlavor] = useState("");
  const [color, setColor] = useState({
    colorId: 0,
    colorPrice: 0,
    colorName: "",
  });
  const [sprinkle, setSprinkle] = useState({
    drageesId: 0,
    drageesPrice: 0,
    drageesName: "",
  });
  const [flower, setFlower] = useState({
    freshFlowerId: 0,
    freshFlowerPrice: 0,
    freshFlowerName: "",
  });
  const [shape, setShape] = useState({
    shapeId: 0,
    shapePrice: 0,
    shapeName: "",
  });
  const [quantity, setQuantity] = useState(0);
  const [subTotal, setSubtotal] = useState(
    selectedProduct.sizes[0]?.packagingPrice
  );
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [openTermsAndConditions, setOpenTermsAndConditions] = useState(false);

  const [isQuantityInvalid, setIsQuantityInvalid] = useState(false);
  const [isSizeInvalid, setIsSizeInvalid] = useState(false);
  const [isTermsAndConditionInvalid, setIsTermsAndConditionInvalid] =
    useState(false);

  const [prices, setPrices] = useState({
    size: 0,
    sprinkle: 0,
    shape: 0,
    color: 0,
    flower: 0,
  });

  const handleUpdatePrice = (name, value) => {
    setPrices((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const value = size.packagingPrice || 0;

    handleUpdatePrice("size", size.packagingPrice);
  }, [size]);

  useEffect(() => {
    const value = sprinkle.drageesPrice || 0;

    handleUpdatePrice("sprinkle", sprinkle.drageesPrice);
  }, [sprinkle]);

  useEffect(() => {
    const value = shape.shapePrice || 0;

    handleUpdatePrice("shape", shape.shapePrice);
  }, [shape]);

  useEffect(() => {
    const value = flower.freshFlowerPrice || 0;

    handleUpdatePrice("flower", flower.freshFlowerPrice);
  }, [flower]);

  useEffect(() => {
    const value = color.colorPrice || 0;

    handleUpdatePrice("color", color.colorPrice);
  }, [color]);

  useEffect(() => {
    let sum = 0;
    for (let key in prices) {
      sum += prices[key] * quantity;
    }

    setSubtotal(sum);
  }, [prices, quantity]);

  const validateOrder = () => {
    {
      !quantity && setIsQuantityInvalid(true);
    }
    {
      !size.packagingId && setIsSizeInvalid(true);
    }
    console.log(termsAndConditions);
    {
      !termsAndConditions
        ? setIsTermsAndConditionInvalid(true)
        : setIsTermsAndConditionInvalid(false);
    }
  };

  console.log(subTotal);

  return (
    <>
      <div className="h-fit w-full">
        <div className="w-max text-left">
          <nav aria-label="breadcrumb">
            <ol className="flex w-full flex-wrap items-center rounded-md bg-blue-gray-50 bg-opacity-60 py-2 px-4">
              <li className="flex items-center text-blue-gray-900 ">
                <p className="opacity-60 text-xs " href="#">
                  Home
                </p>
                <span className="pointer-events-none mx-2 mt-auto opacity-60">
                  /
                </span>
              </li>
              <li className="flex items-center text-blue-gray-900 ">
                <p
                  className="opacity-60 text-xs"
                  href={`/customer/menu/${user.accountId}`}
                >
                  <span>Menu</span>
                </p>
                <span className="pointer-events-none mx-2 mt-auto opacity-60">
                  /
                </span>
              </li>
              <li className="flex items-center text-blue-gray-900 ">
                <p
                  className="opacity-60 text-xs"
                  href={`/customer/menu/${user.accountId}`}
                >
                  <span>Add To Cart</span>
                </p>
                <span className="pointer-events-none mx-2 mt-auto opacity-60">
                  /
                </span>
              </li>
              <li className="flex items-center text-blue-gray-900 ">
                <p className="font-medium text-blue-gray-900 text-xs" href="#">
                  {selectedProduct.productName} Cake
                </p>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex flex-row">
          <Card
            className="flex flex-col gap-3 rounded-xl"
            style={{ width: "40%", height: "500px" }}
          >
            <div
              className="rounded-t-xl"
              style={{
                width: "100%",
                height: "70%",
                backgroundImage: `url('${selectedProduct.image}')`,
                backgroundSize: "cover",
              }}
            ></div>
            <CardContent className="flex flex-col gap-3 rounded-xl">
              <CardTitle>{selectedProduct.productName}</CardTitle>
              <div className="flex flex-row gap-2">
                <Badge
                  variant="outline"
                  className="text-black bg-white h-fit w-fit"
                >
                  {selectedProduct.categoryName}
                </Badge>

                <Badge
                  variant="outline"
                  className="text-white bg-primary text-xs"
                >
                  {selectedProduct.isSpecial ? "Special Cake" : "Common Cake"}
                </Badge>
              </div>

              <div className="flex flex-row gap-2">
                <p className="text-xs font-extralight text-muted-foreground my-auto">
                  Sizes:
                </p>
                {selectedProduct.sizes.map((i, index) => {
                  return (
                    <Button
                      key={i.packagingId}
                      variant="outline"
                      className={`h-7 w-7 border-2 p-1 my-auto cursor-pointer rounded-full text-xs text-center active:bg-primary focus:outline-none focus:border-rose-400 focus:bg-rose-400 focus:text-white ${
                        size.packagingId == i.packagingId
                          ? "bg-rose-400 border-rose-400 text-white"
                          : "bg-transparent"
                      }`}
                      onClick={() => {
                        {
                          size && setIsSizeInvalid(false);
                        }
                        setSize(i);
                      }}
                    >
                      {Array.from(`${i.size}`)[0]}
                      {Array.from(`${i.size}`)[1]}
                    </Button>
                  );
                })}
                <span className="text-ring"> *</span>
                {isSizeInvalid ? (
                  <Label className="errorMessage mb-1">Select size!</Label>
                ) : null}
              </div>

              {!subTotal ? null : (
                <h1 className="text-primary text-xl font-extrabold">
                  ₱{subTotal}.00
                </h1>
              )}
            </CardContent>
          </Card>
          <div
            className="mx-7 grid grid-cols-2 gap-x-2"
            style={{ width: "60%", height: "500px" }}
          >
            <Label className="font-extrabold text-2xl col-span-2">
              Add Ons
            </Label>
            <Separator className="my-4 col-span-2" />
            {/* <div className="flex flex-row flex-wrap gap-1"> */}
            <Label className="col-span-1 mt-1">Flavor</Label>
            <Label className="col-span-1 mt-1">Color</Label>

            <div className="col-span-1 flex flex-row gap-1">
              <Select asChild value={flavor} onValueChange={setFlavor}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a flavor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {flavors.map((i) => {
                      return (
                        <SelectItem key={i.flavorId} value={i}>
                          {i.flavorName}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                disabled={!flavor}
                className="mt-1 h-10 w-fit items-center"
                onClick={() => setFlavor("")}
              >
                <IoIosClose className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>

            <div className="col-span-1 flex flex-row gap-1">
              <Select
                asChild
                value={!color.colorId ? color.colorName : color}
                onValueChange={setColor}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {colors.map((i) => {
                      return (
                        <SelectItem key={i.colorId} value={i}>
                          {i.colorName}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                disabled={!color.colorId}
                className="mt-1 h-10 w-fit items-center"
                onClick={() =>
                  setColor({
                    colorId: 0,
                    colorName: "",
                    colorPrice: 0,
                  })
                }
              >
                <IoIosClose className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>

            <Label className="col-span-1 mt-1">Sprinkle</Label>
            <Label className="col-span-1 mt-1">Flower</Label>
            <div className="col-span-1 flex flex-row gap-1">
              <Select
                asChild
                value={!sprinkle.drageesId ? sprinkle.drageesName : sprinkle}
                onValueChange={setSprinkle}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a sprinkle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sprinkles.map((i) => {
                      return (
                        <SelectItem key={i.drageesId} value={i}>
                          {i.drageesName}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                disabled={!sprinkle.drageesId}
                className="mt-1 h-10 w-fit items-center"
                onClick={() =>
                  setSprinkle({
                    drageesId: 0,
                    drageesPrice: 0,
                    drageesName: "",
                  })
                }
              >
                <IoIosClose className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>

            <div className="col-span-1 flex flex-row gap-1">
              <Select
                asChild
                value={!flower.freshFlowerId ? flower.freshFlowerName : flower}
                onValueChange={setFlower}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a flower" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {flowers.map((i) => {
                      return (
                        <SelectItem key={i.freshFlowerId} value={i}>
                          {i.freshFlowerName}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                disabled={!flower.freshFlowerId}
                className="mt-1 h-10 w-fit items-center"
                onClick={() =>
                  setFlower({
                    freshFlowerId: 0,
                    freshFlowerPrice: 0,
                    freshFlowerName: "",
                  })
                }
              >
                <IoIosClose className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>

            <Label className="col-span-1 mt-1">Shape</Label>
            <Label className="col-span-1 mt-1">Quantity</Label>
            <div className="col-span-1 flex flex-row gap-1">
              <Select
                asChild
                value={!shape.shapeId ? shape.shapeName : shape}
                onValueChange={setShape}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select a shape" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {shapes.map((i) => {
                      return (
                        <SelectItem key={i.shapeId} value={i}>
                          {i.shapeName}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                disabled={!shape.shapeName}
                className="mt-1 h-10 w-fit items-center"
                onClick={() =>
                  setShape({
                    shapeId: 0,
                    shapePrice: 0,
                    shapeName: "",
                  })
                }
              >
                <IoIosClose className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>

            <div className="col-span-1 flex flex-col gap-1">
              <Input
                className="col-span-1"
                type="number"
                min={1}
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => {
                  {
                    quantity && setIsQuantityInvalid(false);
                  }
                  setQuantity(e.target.value);
                }}
              ></Input>
              {isQuantityInvalid ? (
                <Label className="errorMessage">Enter quantity!</Label>
              ) : null}
            </div>
            <Label className="col-span-2">Message</Label>
            <Textarea
              className="mt-1 col-span-2"
              placeholder="Type your message here."
            />
            {/* </div> */}
            <Separator className="my-4 col-span-2" />
            <div className="col-span-2 flex flex-row justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  className="text-white"
                  checked={termsAndConditions}
                  onCheckedChange={setTermsAndConditions}
                />

                <Dialog
                  open={openTermsAndConditions}
                  onOpenChange={setOpenTermsAndConditions}
                >
                  <Button
                    variant="ghost"
                    className="text-sm font-medium p-0 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:bg-transparent hover:underline hover:text-primary"
                    onClick={() => {
                      setOpenTermsAndConditions(true);
                    }}
                  >
                    Accept terms and conditions
                    <span className="text-ring"> *</span>
                  </Button>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Terms and Conditions</DialogTitle>
                      <DialogDescription className="text-justify indent-9">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nihil quae vitae distinctio rerum ab quam sit eligendi,
                        nobis placeat hic officiis dicta neque illum magnam
                        autem fuga impedit molestiae. A quos, quo adipisci
                        quidem beatae praesentium sint esse similique
                        repellendus, ducimus doloremque iste officiis, ea sit
                        soluta blanditiis iusto odit reiciendis voluptates
                        eaque? Adipisci, inventore?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        className="hover:bg-ring active:bg-primary-foreground duration-300"
                        onClick={() => {
                          setTermsAndConditions(true);
                          setIsTermsAndConditionInvalid(false);
                          setOpenTermsAndConditions(false);
                        }}
                      >
                        Accept Terms and Conditions
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Button
                className="hover:bg-ring active:bg-primary-foreground duration-300"
                onClick={() => validateOrder()}
              >
                Add to Cart
              </Button>
            </div>
            {isTermsAndConditionInvalid ? (
              <Label className="errorMessage mb-1">
                Read and accept terms and condition before adding to cart!
              </Label>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuSelectedProduct;
