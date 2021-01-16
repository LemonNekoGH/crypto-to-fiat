<template>
  <v-text-field
      outlined
      :label="data.error ? data.errorLabel : data.defaultLabel"
      readonly
      v-model="data.value"
      :loading="data.converting"
      :error="data.error">
    <template v-slot:prepend>
      <v-menu offset-y>
        <template v-slot:activator="{on, attrs}">
          <v-btn color="primary" text outlined style="height: 56px;" v-on="on" v-bind="attrs">
            {{ $t(data.target) }}
            <v-icon right>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list nav dense>
          <v-list-item @click="data.target = currency" link v-for="(currency, index) in $store.state.fiatCurrency"
                       :key="index">
            <v-list-item-title>{{ $t(currency) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template v-slot:append-outer>
      <v-btn color="error" text outlined style="height: 56px;" @click="$emit('removeTarget')">
        <v-icon left>mdi-delete-forever-outline</v-icon>
        {{ $t("removeTarget") }}
      </v-btn>
    </template>
  </v-text-field>
</template>
<script lang="ts">
import Vue from "vue"
import {TargetCurrencyData} from "@/types";

export default Vue.extend({
  name: "target-currency-field",
  props: {
    data: {
      type: TargetCurrencyData,
      required: true
    }
  }
})
</script>
