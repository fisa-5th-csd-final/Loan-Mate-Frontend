import AutoDepositTable from "./components/AutoDepositTable";
import AutoDepositRegisterButton from "./components/AutoDepositRegisterButton";
import EarlyRepaySection from "./components/EarlyRepaySection";

export default function AutoDepositPage() {
  return (
    <>
      <AutoDepositTable />
      <AutoDepositRegisterButton />
      <EarlyRepaySection />
    </>
  );
}
