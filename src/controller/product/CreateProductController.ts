import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    const createProductService = new CreateProductService();

    if (!req.file) {
      throw new Error("error upload file");
    } else {
      const { filename:banner, originalname } = req.file;

      console.log(banner);

      const product = await createProductService.execute({
        name,
        price,
        description,
        category_id,
        banner,
      });

      res.json(product);
    }
  }
}

export { CreateProductController };
