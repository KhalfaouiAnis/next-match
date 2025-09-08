"use client"

import { Button } from '@heroui/button';
import { Slider } from '@heroui/slider';
import { Select, SelectItem } from '@heroui/select';
import { useFilters } from '@/hooks/useFilters';
import { Spinner } from '@heroui/spinner';

export default function Filters() {
    const { genderList, orderByList, filters, isPending, totalCount,
        selectAge, selectGender, selectOrder } = useFilters()

    return (
        <div className='shadow-md py-2'>
            <div className="flex flex-row justify-around items-center">
                <div className='flex items-center gap-2'>
                    <div className='text-secondary font-semibold text-xl'>
                        Results: {isPending ? <Spinner size='sm' color='secondary' /> : totalCount}
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <div>Gender:</div>
                    {
                        genderList.map(({ icon: Icon, value }) => (
                            <Button
                                key={value} size='sm' isIconOnly
                                color={filters.gender.includes(value) ? 'secondary' : 'default'}
                                onPress={() => selectGender(value)}
                            >
                                <Icon size={24} />
                            </Button>
                        ))
                    }
                </div>
                <div className='flex flex-row items-center gap-2 w-1/4'>
                    <Slider
                        aria-label='slider for age selection'
                        label="Age range"
                        color='secondary'
                        size='sm'
                        minValue={18}
                        maxValue={99}
                        defaultValue={filters.ageRange}
                        onChangeEnd={(value) => selectAge(value as number[])}
                    />
                </div>
                <div className="w-1/4">
                    <Select
                        size='sm'
                        fullWidth
                        placeholder='Order by'
                        label='Order by'
                        variant='bordered'
                        color='secondary'
                        aria-label='Order by selector'
                        selectedKeys={new Set([filters.orderBy])}
                        onSelectionChange={selectOrder}
                    >
                        {
                            orderByList.map(item => (
                                <SelectItem key={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>
            </div>
        </div>
    )
}