import { Router } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma";

const router = Router();

const toNumber = (value: Prisma.Decimal | null): number | null => {
  if (!value) {
    return null;
  }
  return Number(value);
};

router.get("/", async (_req, res) => {
  const stocks = await prisma.stock.findMany({
    orderBy: { ticker: "asc" },
  });
  const payload = stocks.map((stock) => ({
    ...stock,
    lastPrice: toNumber(stock.lastPrice),
    baseCurrencyValue: toNumber(stock.baseCurrencyValue),
  }));
  res.json(payload);
});

router.get("/:ticker", async (req, res) => {
  const stock = await prisma.stock.findUnique({
    where: { ticker: req.params.ticker },
  });
  if (!stock) {
    res.status(404).json({ message: "Stock not found" });
    return;
  }
  res.json({
    ...stock,
    lastPrice: toNumber(stock.lastPrice),
    baseCurrencyValue: toNumber(stock.baseCurrencyValue),
  });
});

router.get("/:ticker/dividends", async (req, res) => {
  const stock = await prisma.stock.findUnique({
    where: { ticker: req.params.ticker },
    select: { id: true },
  });
  if (!stock) {
    res.status(404).json({ message: "Stock not found" });
    return;
  }
  const dividends = await prisma.dividend.findMany({
    where: { stockId: stock.id },
    orderBy: { exDate: "desc" },
  });
  const payload = dividends.map((dividend) => ({
    ...dividend,
    amount: Number(dividend.amount),
    baseCurrencyValue: Number(dividend.baseCurrencyValue),
  }));
  res.json(payload);
});

export default router;
