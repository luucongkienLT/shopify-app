import {
  TextField,
  IndexTable,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  ChoiceList,
  RangeSlider,
  Pagination,
  Card,
  Button,
  Image,
} from "@shopify/polaris";

import { useState, useCallback } from "react";
import "@shopify/polaris/build/esm/styles.css";
import AddProductModal from "./components/AddProductModal";
import "./products.css";
import {
  disambiguateLabel,
  isEmpty,
  status_product,
} from "./utils/utils.common";
import AddRuleModal from "./components/AddRuleModal";

function Products() {
  const list = [
    {
      id: "1",
      image_product: "/product.png",
      product: "Product 1",
      last_update: "08-12-2023 15:52:18",
      rule: 1,
      status: "ACTIVE",
    },
    {
      id: "2",
      image_product: "/product.png",
      product: "Product 2",
      last_update: "08-12-2023 15:52:18",
      rule: 0,
      status: "NO_RULE",
    },
    {
      id: "3",
      image_product: "/product.png",
      product: "Product 3",
      last_update: "08-12-2023 15:52:18",
      rule: 3,
      status: "NO_RULE",
    },
    {
      id: "4",
      image_product: "/product.png",
      product: "Product 4",
      last_update: "08-12-2023 15:52:18",
      rule: 3,
      status: "ACTIVE",
    },
    {
      id: "5",
      image_product: "/product.png",
      product: "Product 5",
      last_update: "08-12-2023 15:52:18",
      rule: 1,
      status: "ACTIVE",
    },
    {
      id: "6",
      image_product: "/product.png",
      product: "Product 6",
      last_update: "08-12-2023 15:52:18",
      rule: 2,
      status: "ACTIVE",
    },
    {
      id: "7",
      image_product: "/product.png",
      product: "Product 7",
      last_update: "08-12-2023 15:52:18",
      rule: 0,
      status: "NO_RULE",
    },
    {
      id: "8",
      image_product: "/product.png",
      product: "Product 8",
      last_update: "08-12-2023 15:52:18",
      rule: 1,
      status: "NO_RULE",
    },
    {
      id: "9",
      image_product: "/product.png",
      product: "Product 9",
      last_update: "08-12-2023 15:52:18",
      rule: 3,
      status: "ACTIVE",
    },
    {
      id: "10",
      image_product: "/product.png",
      product: "Product 10",
      last_update: "08-12-2023 15:52:18",
      rule: 2,
      status: "NO_RULE",
    },
  ];
  const [state, setState] = useState({
    itemStrings: ["All", "Active", "No rule"],
    selected: 0,
    modalActive: false,
    modalRule: false,
    accountStatus: undefined,
    moneySpent: undefined,
    taggedWith: "",
    queryValue: "",
    productList: list,
  });

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const tabs = state.itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => handleActionFilter(item, index),
    id: `${item}-${index}`,
  }));
  const handleActionFilter = (item, index) => {
    console.log(item, index);

    setState((prevState) => ({
      ...prevState,
      selected: index,
    }));
  };

  const { mode, setMode } = useSetIndexFiltersMode();
  const onHandleCancel = () => {};

  const onHandleSave = async () => {
    await sleep(1);
    return true;
  };

  const primaryAction = {
    type: "save",
    onAction: onHandleSave,
    disabled: false,
    loading: false,
  };

  const handleAccountStatusChange = useCallback(
    (value) => setState((prev) => ({ ...prev, accountStatus: value })),
    []
  );
  const handleMoneySpentChange = useCallback(
    (value) => setState((prev) => ({ ...prev, moneySpent: value })),
    []
  );
  const handleTaggedWithChange = useCallback(
    (value) => setState((prev) => ({ ...prev, taggedWith: value })),
    []
  );
  const handleFiltersQueryChange = useCallback(
    (value) => setState((prev) => ({ ...prev, queryValue: value })),
    []
  );
  const handleAccountStatusRemove = useCallback(
    () => setState((prev) => ({ ...prev, accountStatus: undefined })),
    []
  );
  const handleMoneySpentRemove = useCallback(
    () => setState((prev) => ({ ...prev, moneySpent: undefined })),
    []
  );
  const handleTaggedWithRemove = useCallback(
    () => setState((prev) => ({ ...prev, taggedWith: "" })),
    []
  );
  const handleQueryValueRemove = useCallback(
    () => setState((prev) => ({ ...prev, queryValue: "" })),
    []
  );
  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleAccountStatusRemove,
    handleMoneySpentRemove,
    handleQueryValueRemove,
    handleTaggedWithRemove,
  ]);

  const filters = [
    {
      key: "accountStatus",
      label: "Account status",
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            { label: "Enabled", value: "enabled" },
            { label: "Not invited", value: "not invited" },
            { label: "Invited", value: "invited" },
            { label: "Declined", value: "declined" },
          ]}
          selected={state.accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={state.taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: "moneySpent",
      label: "Money spent",
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={state.moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      ),
    },
  ];

  const appliedFilters = [];
  if (state.accountStatus && !isEmpty(state.accountStatus)) {
    const key = "accountStatus";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, state.accountStatus),
      onRemove: handleAccountStatusRemove,
    });
  }
  if (state.moneySpent) {
    const key = "moneySpent";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, state.moneySpent),
      onRemove: handleMoneySpentRemove,
    });
  }
  if (!isEmpty(state.taggedWith)) {
    const key = "taggedWith";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, state.taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }

  const handleAddRule = (e, id) => {
    e.stopPropagation();
    toggleModalRule();
  };
  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(state.productList);

  const rowMarkup = state.productList.map(
    (
      { id, product, image_product, rule, last_update, status, add_rule },
      index
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Image width={50} source={image_product} />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {product}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell className="rule">{rule}</IndexTable.Cell>
        <IndexTable.Cell>{last_update}</IndexTable.Cell>
        <IndexTable.Cell>
          <span
            className={
              status_product.ACTIVE === status
                ? "active-status"
                : "unactive-status"
            }
          >
            <Text>
              {status_product.ACTIVE === status ? "Active" : "No rule"}
            </Text>
          </span>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Button onClick={(e) => handleAddRule(e, id)}>+ Add rule</Button>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  const emptyStateMarkup =
    state.queryValue || appliedFilters.length > 0 ? (
      <p>No orders found</p>
    ) : (
      <p>No orders available</p>
    );

  const toggleModal = useCallback(
    () => setState((prev) => ({ ...prev, modalActive: !prev.modalActive })),
    []
  );
  const toggleModalRule = useCallback(
    () => setState((prev) => ({ ...prev, modalRule: !prev.modalRule })),
    []
  );

  return (
    <>
      <div className="d-flex justify-between align-center mb-20">
        <div>Products</div>
        <div className="m-w-120">
          <Button onClick={toggleModal}>Add Product</Button>
        </div>
      </div>
      <Card>
        <IndexFilters
          queryValue={state.queryValue}
          queryPlaceholder="Searching in all"
          onQueryChange={handleFiltersQueryChange}
          onQueryClear={handleQueryValueRemove}
          primaryAction={primaryAction}
          cancelAction={{
            onAction: onHandleCancel,
            disabled: true,
            loading: false,
          }}
          tabs={tabs}
          selected={state.selected}
          canCreateNewView={false}
          filters={filters}
          appliedFilters={appliedFilters}
          mode={mode}
          setMode={setMode}
          onClearAll={handleFiltersClearAll}
        />
        <IndexTable
          resourceName={resourceName}
          itemCount={state.productList.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "" },
            { title: "Product" },
            { title: "Rules(s)" },
            { title: "Last update" },
            { title: "Status" },
            { title: " " },
          ]}
          emptyState={emptyStateMarkup}
        >
          {rowMarkup}
        </IndexTable>
        <div className="d-flex flex-end">
          <Pagination
            hasPrevious
            onPrevious={() => {
              console.log("Previous");
            }}
            hasNext
            onNext={() => {
              console.log("Next");
            }}
          />
        </div>
      </Card>
      <AddProductModal active={state.modalActive} toggleModal={toggleModal} />
      <AddRuleModal active={state.modalRule} toggleModal={toggleModalRule} />
    </>
  );
}

export default Products;
