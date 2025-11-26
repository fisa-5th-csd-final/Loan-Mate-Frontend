import NavigationBar from "@/components/navigation/BackRouteNavigation"
import FixedBudgetProgressBar from "@/app/spending-balance/_components/FixedBudgetProgressBar"

export default function Page(){
    return (
        <div>
            <NavigationBar title="나의 소비밸런스 맞추기"/>
            <FixedBudgetProgressBar progress={30} min={0} max={100000} />
        </div>
    );
}