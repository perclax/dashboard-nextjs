import { fetchRevenue } from '@/app/lib/data';
import { generateYAxis } from '@/app/lib/utils';

export default async function RevenueChart() {
  const revenue = await fetchRevenue();

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  return (
    <div className="w-full md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Recent Revenue</h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Eje Y */}
          <div className="col-span-2 flex flex-col justify-between text-sm text-gray-400">
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {/* Barras */}
          <div className="col-span-10 flex items-end gap-2">
            {revenue.map((month) => (
              <div
                key={month.month}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <div
                  className="w-full rounded-md bg-blue-400"
                  style={{
                    height: `${(month.revenue / topLabel) * 100}%`,
                  }}
                />
                <p className="text-sm text-gray-400">{month.month}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}