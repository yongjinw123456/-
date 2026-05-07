import { ClaimCalculationResult } from '../types';

/**
 * 核心理赔规则计算
 * 1) 超142.04米赔付40万
 * 2) 142.04-144.04米每增0.01米+0.8万，累计限额200万
 * 3) 144.04-147.71米每增0.01米+3万，累计限额1300万
 * 4) 超147.71米赔付3000万
 * 5) 淹没时长上浮: 1-3天 10%, 3-7天 20%, >7天 30%
 * 6) 移民转移安置费: 400/人, 每次限40万, 年累计80万 (此处只算单次)
 * 7) 人身伤亡: 30万/人, 年累计90万 (此处只算单次)
 */
export function calculateClaim(
  peakLevel: number,
  durationDays: number,
  relocationCount: number = 0,
  casualtyCount: number = 0
): ClaimCalculationResult {
  const CLAIM_LEVEL_BASE = 142.04;
  const LEVEL_2_LIMIT = 144.04;
  const LEVEL_3_LIMIT = 147.71;

  let basePayout = 0;
  let incrementPayout = 0;

  if (peakLevel >= CLAIM_LEVEL_BASE) {
    basePayout = 400000; // 40万

    if (peakLevel <= LEVEL_2_LIMIT) {
      // 区间 2: 142.04 - 144.04
      const diff = Math.max(0, peakLevel - CLAIM_LEVEL_BASE);
      const increments = Math.floor(diff * 100);
      incrementPayout = Math.min(2000000 - basePayout, increments * 8000);
    } else if (peakLevel <= LEVEL_3_LIMIT) {
      // 区间 3: 144.04 - 147.71
      // 先算满区间2的增量
      const level2MaxIncrement = 2000000 - 400000;
      const diff3 = peakLevel - LEVEL_2_LIMIT;
      const increments3 = Math.floor(diff3 * 100);
      incrementPayout = level2MaxIncrement + Math.min(13000000 - 2000000, increments3 * 30000);
    } else {
      // 区间 4: > 147.71
      basePayout = 30000000; // 3000万
      incrementPayout = 0;
    }
  }

  // 淹没时长上浮
  let durationMultiplier = 0;
  if (durationDays > 7) {
    durationMultiplier = 0.3;
  } else if (durationDays > 3) {
    durationMultiplier = 0.2;
  } else if (durationDays > 1) {
    durationMultiplier = 0.1;
  }

  const subTotal = basePayout + incrementPayout;
  const durationBonus = subTotal * durationMultiplier;
  const totalPayout = subTotal + durationBonus;

  // 移民转移安置费 (单次限额40万)
  const relocationPayout = Math.min(400000, relocationCount * 400);

  // 人身伤亡 (单次限额90万, 每人30万)
  const casualtyPayout = Math.min(900000, casualtyCount * 300000);

  return {
    basePayout,
    incrementPayout,
    durationBonus,
    totalPayout,
    relocationPayout,
    casualtyPayout,
    grandTotal: totalPayout + relocationPayout + casualtyPayout,
  };
}
