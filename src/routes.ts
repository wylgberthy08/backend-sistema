import { Router, Request, Response } from "express";
import multer from "multer";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { DetailUserController } from "./controller/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controller/Category/CreateCategoryController";
import { ListCategoryController } from "./controller/Category/ListCategoryController";
import { CreateProductController } from "./controller/product/CreateProductController";

import uploadConfig from "./config/multer";
import { ListByCategoryController } from "./controller/product/ListByCategoryController";
import { CreateOrderController } from "./controller/order/CreateOrderController";
import { RemoveOrderController } from "./controller/order/RemoveOrderController";
import { AddItemController } from "./controller/order/AddItemController";
import { RemoveItemController } from "./controller/order/RemoveItemController";
import { SendOrderController } from "./controller/order/SendOrderController";
import { ListOrderController } from "./controller/order/ListOrderController";
import { DetailOrderController } from "./controller/order/DetailOrderController";
const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// Rotas users
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

// Rotas Category

router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);

router.get("/category", isAuthenticated, new ListCategoryController().handle);

// rotas product
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
);

// Rotas de orders

router.post("/order", isAuthenticated, new CreateOrderController().handle);
router.delete("/order", isAuthenticated, new RemoveOrderController().handle);
router.post("/order/add", isAuthenticated, new AddItemController().handle);
router.delete(
  "/order/remove",
  isAuthenticated,
  new RemoveItemController().handle
);

router.put("/order/send", isAuthenticated, new SendOrderController().handle);
router.get("/orders", isAuthenticated, new ListOrderController().handle);
router.get(
  "/order/detail",
  isAuthenticated,
  new DetailOrderController().handle
);
export { router };
