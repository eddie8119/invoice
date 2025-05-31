import { TextRecognition } from '@react-native-ml-kit/text-recognition';
import * as ImageManipulator from 'expo-image-manipulator';

export interface InvoiceItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface InvoiceData {
  companyName: string;
  date: string;
  items: InvoiceItem[];
  totalAmount: number;
}

export class InvoiceOCRService {
  /**
   * 預處理圖片以提高辨識準確度
   */
  private async preprocessImage(imageUri: string): Promise<string> {
    const processed = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        { resize: { width: 1200 } }, // 調整大小以提高處理速度
        { normalize: true }, // 正規化圖片亮度
      ],
      {
        compress: 0.8,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );
    return processed.uri;
  }

  /**
   * 解析發票文字內容
   */
  private parseInvoiceText(text: string): InvoiceData {
    // 解析公司名稱（支援中文公司名）
    const companyPattern =
      /([\u4e00-\u9fa5]{2,}公司|[\u4e00-\u9fa5]{2,}行號|[\u4e00-\u9fa5]{2,}商行)/;
    const companyMatch = text.match(companyPattern);
    const companyName = companyMatch ? companyMatch[1] : '未知公司';

    // 解析日期（支援多種日期格式）
    const datePattern =
      /(\d{4}[-/.年]\d{1,2}[-/.月]\d{1,2}日?|\d{3}年\d{1,2}月\d{1,2}日)/;
    const dateMatch = text.match(datePattern);
    const date = dateMatch ? this.normalizeDate(dateMatch[1]) : '';

    // 解析商品項目
    const items: InvoiceItem[] = [];
    const lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // 匹配品項格式：品名 數量 單價 金額
      const itemPattern = /^([\u4e00-\u9fa5a-zA-Z\s]+)\s*(\d+)\s*(\d+)\s*(\d+)/;
      const itemMatch = line.match(itemPattern);

      if (itemMatch) {
        const [, name, quantity, unitPrice, totalPrice] = itemMatch;
        items.push({
          name: name.trim(),
          quantity: parseInt(quantity, 10),
          unitPrice: parseInt(unitPrice, 10),
          totalPrice: parseInt(totalPrice, 10),
        });
      }
    }

    // 計算總金額
    const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

    return {
      companyName,
      date,
      items,
      totalAmount,
    };
  }

  /**
   * 標準化日期格式
   */
  private normalizeDate(date: string): string {
    // 處理民國年份
    if (date.includes('年')) {
      const parts = date.match(/(\d{2,3})年(\d{1,2})月(\d{1,2})日?/);
      if (parts) {
        const [, year, month, day] = parts;
        const westernYear = parseInt(year, 10) + (year.length === 3 ? 0 : 1911);
        return `${westernYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
    }

    // 處理西元年份
    const normalized = date.replace(/[年月日/.]/g, '-').replace(/-+$/, '');
    const [year, month, day] = normalized.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  /**
   * 掃描發票並辨識內容
   */
  public async scanInvoice(imageUri: string): Promise<InvoiceData> {
    try {
      // 預處理圖片
      const processedUri = await this.preprocessImage(imageUri);

      // 執行文字辨識
      const result = await TextRecognition.recognize(processedUri);

      // 解析發票內容
      const invoiceData = this.parseInvoiceText(result.text);

      return invoiceData;
    } catch (error) {
      console.error('發票掃描失敗:', error);
      throw new Error('發票掃描失敗');
    }
  }
}
